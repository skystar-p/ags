// @ts-expect-error missing types
import Gio from "gi://Gio";
import GUtils from "gi://GUtils";

export function authenticate(password: string) {
  return new Promise((resolve, reject) => {
    GUtils.authenticate(password, 0, null, (_: unknown, res: Gio.AsyncResult) => {
      try {
        resolve(GUtils.authenticate_finish(res));
      } catch (e) {
        reject(e);
      }
    });
  });
}

export function authenticateUser(username: string, password: string) {
  return new Promise((resolve, reject) => {
    GUtils.authenticate_user(
      username,
      password,
      0,
      null,
      (_: unknown, res: Gio.AsyncResult) => {
        try {
          resolve(GUtils.authenticate_finish(res));
        } catch (e) {
          reject(e);
        }
      },
    );
  });
}
