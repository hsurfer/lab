/**
 * Creates an anchor element `<a></a>` with
 * the base64 pdf source and a filename with the
 * HTML5 `download` attribute then clicks on it.
 * @param  {string} pdf 
 * @return {void}     
 */
function downloadPDF() {
    //const linkSource = `data:application/pdf;base64,${pdf}`;
    const linkSource = `data:application/pdf;base64,/pdf`;
    const downloadLink = document.createElement("a");
    const fileName = "constancia.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}