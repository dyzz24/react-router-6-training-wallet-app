export const fileLoadHelper = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
}
