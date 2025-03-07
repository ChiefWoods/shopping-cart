import GitHub from "../assets/github.svg";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <span className="made-by">
        Copyright @ {new Date().getFullYear()} ChiefWoods
      </span>
      <a
        className="github-link"
        href="https://github.com/ChiefWoods/shopping-cart"
        target="_blank"
        rel="noreferrer"
      >
        <img src={GitHub} className="github-icon" alt="GitHub" />
      </a>
    </footer>
  );
}
