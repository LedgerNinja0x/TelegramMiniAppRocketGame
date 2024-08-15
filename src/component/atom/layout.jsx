const Layout = ( { children, className } ) => {
    return (
        <div className={`p-4 flex-auto ${className}`}>
            {children}
        </div>
    )
}

export default Layout;