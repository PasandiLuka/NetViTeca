export type User = {
  username: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
};

// Obtener usuarios guardados
export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

// Guardar nuevo usuario
export const saveUser = (user: User) => {
  const users = getUsers();

  // Validación duplicados
  if (users.some(u => u.email === user.email))
    return { ok: false, msg: "El correo ya está registrado" };

  if (users.some(u => u.username === user.username))
    return { ok: false, msg: "El nombre de usuario ya existe" };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  return { ok: true };
};

// Login
export const loginUser = (credential: string, password: string) => {
  const users = getUsers();

  const user = users.find(
    u => (u.email === credential || u.username === credential) && u.password === password
  );

  if (!user) return { ok: false, msg: "Usuario/contraseña incorrectos" };

  localStorage.setItem("session", JSON.stringify(user));
  return { ok: true, user };
};

// Obtener sesión activa
export const getSession = () => {
  return JSON.parse(localStorage.getItem("session") || "null");
};

// Cerrar sesión
export const logout = () => localStorage.removeItem("session");

// Actualizar usuario
export const updateUser = (updatedUser: User) => {
  const users = getUsers();
  const index = users.findIndex(u => u.username === updatedUser.username); // Buscamos por username original o ID si tuvieramos

  // IMPORTANTE: Si el usuario cambia su username, necesitamos saber cuál era el anterior.
  // Por simplicidad en este MVP sin backend real, asumiremos que username NO se puede cambiar o
  // que pasamos el usuario completo actualizado.
  // Mejor enfoque para localStorage: Buscar por email (que suele ser único) o asumiendo que el argumento ya trae los cambios.

  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));

    // Si el usuario actualizado es el actual en sesión, actualizamos también la sesión
    const currentSession = getSession();
    if (currentSession && currentSession.username === updatedUser.username) {
      localStorage.setItem("session", JSON.stringify(updatedUser));
    }
    return { ok: true };
  }
  return { ok: false, msg: "Usuario no encontrado" };
};

// Eliminar usuario
export const deleteUser = (username: string) => {
  let users = getUsers();
  const initialLength = users.length;
  users = users.filter(u => u.username !== username);

  if (users.length < initialLength) {
    localStorage.setItem("users", JSON.stringify(users));
    // Si borramos el usuario actual, cerramos sesión
    const currentSession = getSession();
    if (currentSession && currentSession.username === username) {
      logout();
    }
    return { ok: true };
  }
  return { ok: false, msg: "Usuario no encontrado" };
};
