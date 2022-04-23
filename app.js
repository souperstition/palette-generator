//divs
const primary = document.querySelector('#primary');
const secondary = document.querySelector('#secondary');
const accent = document.querySelector('#accent');
//displayed color values
const pText = document.querySelector('#pText');
const sText = document.querySelector('#sText');
const aText = document.querySelector('#aText');
//button and color picker
const btn = document.querySelector('#generate');
const primaryInput = document.querySelector('#p');
const container = document.querySelector('.container');
const demo = document.querySelector('.demo');
const sidebar = document.querySelector('.sidebar');
const colors = document.querySelector('.colors');
const h1 = document.querySelector('h1');
const h3 = document.querySelectorAll('h3');
const image = document.querySelector('.fa-image');
const links = document.querySelector('.icons');
//generate random colors on page load and button click
let hslPrimary = {
    h: Math.floor(Math.random() * 357),
    s: Math.floor((Math.random() * 50) + 20),
    l: Math.floor((Math.random() * 50) + 30)
}

const assignColors = () => {
    let textColor;
    let accentTextColor;
    let accentHoverText;

    const hslSecondary = Object.assign({}, hslPrimary);
    if (hslSecondary.h + 150 > 360) {
        hslSecondary.h = ((hslSecondary.h + 150) - 360)
    } else {
        hslSecondary.h += 150;
    }

    const hslAccent = Object.assign({}, hslPrimary);
    if (hslAccent.h - 150 < 0) {
        hslAccent.h = ((hslAccent.h - 150) + 360)
    } else {
        hslAccent.h -= 150;
    }

    //adjust for contrast
    if (hslPrimary.l < 50) {
        textColor = '#fff';
        accentTextColor = `hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l + 60}%)`;
        accentHoverText = `hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l - 40}%)`;
    } 

    else {
        textColor = '#000';
        accentTextColor = `hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l - 40}%)`;
        accentHoverText = `hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l + 60}%)`;
    }

    const primaryColor = `hsl(${hslPrimary.h}, ${hslPrimary.s}%, ${hslPrimary.l}%)`;
    const secondaryColor = `hsl(${hslSecondary.h}, ${hslSecondary.s}%, ${hslSecondary.l}%)`;
    const accentColor = `hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l}%)`;
    const bgColor = `hsl(${hslPrimary.h}, ${hslPrimary.s}%, ${hslPrimary.l + 20}%)`;
    
    primary.style.backgroundColor = primaryColor;
    secondary.style.backgroundColor = secondaryColor;
    accent.style.backgroundColor = accentColor;
    document.body.style.backgroundColor = bgColor;
    demo.style.backgroundColor = `hsl(${hslPrimary.h}, ${hslPrimary.s}%, ${hslPrimary.l + 60}%)`
    sidebar.style.backgroundColor = `hsla(${hslPrimary.h}, ${hslPrimary.s}%, ${hslPrimary.l + 40}%, 50%)`;
    h1.style.color = primaryColor;
    links.style.color = secondaryColor;
    image.style.color = primaryColor;
    image.style.backgroundColor = bgColor;
    container.style.backgroundColor = `hsl(${hslPrimary.h}, ${hslPrimary.s}%, ${hslPrimary.l + 40}%)`;
    colors.setAttribute('style', `color: ${textColor}`);

    for (let header of h3) {
        header.style.color = secondaryColor;
    }

    btn.setAttribute('style', `
        background: ${accentColor};
        border: 1px solid hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l + 40}%);
        color: ${accentTextColor};
    `)
    btn.addEventListener('mouseenter', () => {
        btn.setAttribute('style', `
            background: hsla(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l}%, 60%);
            border: 1px solid ${accentColor};
            color: ${accentHoverText};
        `)
    })
    btn.addEventListener('mouseleave', () => {
        btn.setAttribute('style', `
            background: ${accentColor};
            border: 1px solid hsl(${hslAccent.h}, ${hslAccent.s}%, ${hslAccent.l + 40}%);
            color: ${accentTextColor};
        `)
    })
    pText.innerHTML = `<i class="fa fa-copy"></i> <span class="copy">${primaryColor}</span>`;
    sText.innerHTML = `<i class="fa fa-copy"></i> <span class="copy">${secondaryColor}</span>`;
    aText.innerHTML = `<i class="fa fa-copy"></i> <span class="copy">${accentColor}</span>`;
}

const randomColors = () => {
    hslPrimary = {
        h: Math.floor(Math.random() * 357),
        s: Math.floor((Math.random() * 80) + 20),
        l: Math.floor((Math.random() * 60) + 20)
    }

    assignColors();
}

assignColors();
btn.addEventListener('click', randomColors);

//update palette based on chosen color
function HEXtoHSL(hex) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return {
        h: h,
        s: s,
        l: l
    };
}

primaryInput.addEventListener('input', () => {
    const primaryHex = primaryInput.value;
    hslPrimary = HEXtoHSL(primaryHex);
    
    assignColors();
})

//copy displayed values to clipboard
const copyText = document.querySelectorAll('span');
const icon = document.querySelectorAll('i');
pText.addEventListener('click', () => {
    icon[1].classList.remove('fa-copy');
    icon[1].classList.add('fa-check');
    setTimeout(() => {
        icon[1].classList.remove('fa-check');
        icon[1].classList.add('fa-copy');
    }, 1500)
    navigator.clipboard.writeText(copyText[0].innerHTML);
});
sText.addEventListener('click', () => {
    icon[2].classList.remove('fa-copy');
    icon[2].classList.add('fa-check');
    setTimeout(() => {
        icon[2].classList.remove('fa-check');
        icon[2].classList.add('fa-copy');
    }, 1500)
    navigator.clipboard.writeText(copyText[1].innerHTML);
});
aText.addEventListener('click', () => {
    icon[3].classList.remove('fa-copy');
    icon[3].classList.add('fa-check');
    setTimeout(() => {
        icon[3].classList.remove('fa-check');
        icon[3].classList.add('fa-copy');
    }, 1500)
    navigator.clipboard.writeText(copyText[2].innerHTML);
});
