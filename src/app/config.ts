const apiBaseUrl = 'https://localhost:7195';

export const Config = {
  apiBaseUrl,
  users: {
    login: `${apiBaseUrl}/api/users/login`,
    changePassword: `${apiBaseUrl}/api/users/change-password`,
    uploadProfilePicture: `${apiBaseUrl}/api/users/upload-profile-picture`,
    newToken: `${apiBaseUrl}/api/users/new-token`,
  },
  schools: {
    getAll: `${apiBaseUrl}/api/school`,
    getById: (id: string | number) => `${apiBaseUrl}/api/school/${id}`,
    create: `${apiBaseUrl}/api/school`,
    update: (id: string | number) => `${apiBaseUrl}/api/school/${id}`,
    delete: (id: string | number) => `${apiBaseUrl}/api/school/${id}`,
  },
};
