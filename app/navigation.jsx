"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef} from "react";

const pages=[["Portfolio","/portfolio/"],["Services","/services/"],["Studio","/studio/"],["Contact","/contact/"]];
export function Navigation(){
  const path=usePathname(), menu=useRef(null), header=useRef(null);
  useEffect(()=>{
    menu.current.open=false;
    const update=()=>header.current.toggleAttribute("data-solid",path!=="/" || scrollY>48);
    function escape(e){if(e.key==="Escape" && menu.current.open){menu.current.open=false;menu.current.querySelector("summary").focus();}}
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("keydown",escape);
    return ()=>{window.removeEventListener("scroll",update);window.removeEventListener("keydown",escape);};
  },[path]);
  function links(){return pages.map(([label,href])=><Link key={href} href={href} onClick={()=>{menu.current.open=false;}} aria-current={path.replace(/\/$/,"")===href.slice(0,-1)?"page":undefined}>{label}</Link>);}
  return <header className="mast" ref={header} data-solid={path!=="/"?"":undefined}><div className="mast-inner shell">
    <Link className="brand" href="/" aria-label="Vriddhi Interior Designer home"><img src="/images/vriddhi-mark.webp" width="42" height="42" alt=""/><span>Vriddhi<small>Interior Designer</small></span></Link>
    <nav className="desk-nav" aria-label="Main navigation">{links()}</nav>
    <a className="enquire" href="https://wa.me/919307999738">WhatsApp <span className="out-arrow" aria-hidden="true"/></a>
    <details className="mobile-nav" ref={menu}><summary aria-label="Navigation menu"><i/><i/></summary><nav aria-label="Mobile navigation">{links()}</nav></details>
  </div></header>;
}
