export const typeText = (text, charIndex, element)=>{
    const delay = 20;
    console.log(charIndex)
    if(charIndex>=text.length){
        return
    }
    element.innerText = text.slice(0,charIndex) + text.charAt(charIndex)
    charIndex++;
    setTimeout(typeText, delay, text,charIndex, element);
}