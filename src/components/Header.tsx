import logo from '../assets/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <img  src={logo} alt='logo'  />
            <h1>Quiz app</h1>
        </header>
    )
}