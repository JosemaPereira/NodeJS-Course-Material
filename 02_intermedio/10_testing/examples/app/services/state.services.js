const cookieName = 'MyCookie';

export const StateServices = {
  setCookie: (res) => {
    res.cookie(cookieName, 'Wizeline cookie');
  },
  deleteCookie: (res) => {
    res.clearCookie(cookieName);
  },
  createSession: (req, sessionVar) => {
    req.session[sessionVar] = 1;
  },
  updateSession: (req, sessionVar) => {
    req.session[sessionVar]++;
  },
};
