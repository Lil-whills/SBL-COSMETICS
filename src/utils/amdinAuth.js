const ADMIN_EMAIL = "admin@sblcosmetics.com";
const ADMIN_PASSWORD = "SBLAdmin123";

const ADMIN_SESSION_KEY = "sbl_admin_session";

export const validateAdminCredentials = (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  return (
    normalizedEmail === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
};

export const loginAdmin = (email) => {
  const adminSession = {
    email: email.trim().toLowerCase(),
    role: "admin",
    isAuthenticated: true,
    loginTime: new Date().toISOString(),
  };

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
  return adminSession;
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const getAdminSession = () => {
  const session = localStorage.getItem(ADMIN_SESSION_KEY);

  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch (error) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
};

export const isAdminAuthenticated = () => {
  const session = getAdminSession();
  return Boolean(session?.isAuthenticated);
};

export const getAdminCredentialsForDemo = () => {
  return {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };
};