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