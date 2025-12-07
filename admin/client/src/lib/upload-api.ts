// Upload API functionality
export const uploadApi = {
  async uploadFile(file: File): Promise<Response> {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });
  },

  async uploadMultipleFiles(files: FileList): Promise<Response> {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });

    return fetch('/api/admin/upload/multiple', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });
  }
};