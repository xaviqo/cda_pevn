function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index) ? pathname.substring(index + 1) : pathname;
}

console.log(getFilenameFromUrl('https://res.cloudinary.com/xaviqo/image/upload/v1654417434/Jes%C3%BAs-Fuente-5-Copy_ho5msh.jpg'));