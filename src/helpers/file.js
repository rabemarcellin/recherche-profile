export const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
      return 'image';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'unknown';
    }
  }