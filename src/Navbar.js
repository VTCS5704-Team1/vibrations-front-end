import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/home" className="site-title">Vibrations</Link>
            
            <ul>
                <CustomLink to="/profile">My Profile</CustomLink>
                <CustomLink to="/matches">Matches</CustomLink>
                <CustomLink to="/settings">Settings</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}