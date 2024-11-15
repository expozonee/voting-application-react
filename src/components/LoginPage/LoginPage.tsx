import "./LoginPage.css";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { useUser } from "../../providers/UserProvider";

export default function LoginPage() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useUser();

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    usernameRef.current!.style.removeProperty("border");
    passwordRef.current!.style.removeProperty("border");

    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;

    if (!username) {
      usernameRef.current!.style.border = "1px solid red";
    }

    if (!password) {
      passwordRef.current!.style.border = "1px solid red";
    }

    if (!username || !password) return;

    const { ok, status } = login(username, password);
    if (!ok) {
      setStatus(status);
    } else {
      setStatus(undefined);
    }
  }

  return (
    <article className="login__container">
      <section className="login">
        <img src="" alt="" />
        <h1 className="logo">Monsters</h1>
        <p>Sign in and vote for your favorite monster!!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" name="username" id="username" />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
          />
          <button type="submit">Log In</button>
        </form>
        {status && <p className="status">{status}</p>}
      </section>
    </article>
  );
}
