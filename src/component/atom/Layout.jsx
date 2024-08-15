import React from "react";

const Layout = ({children, className}) =>{
  return(
    <div className={`${className} p-4 flex-auto bg-gradient-to-b from-[#0000D0] to-[#9393EB]`}>
      {children}
    </div>
  )
}

export default Layout;