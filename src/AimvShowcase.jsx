import { useEffect, useState } from 'react'
import DepthCarousel from './DepthCarousel'
import './AimvShowcase.css'

const aimvWorks = [
  { title: '周杰伦 MV', video: '/assets/media/aimv/jay-chou-mv.mp4', image: '/assets/media/aimv/jay-chou-mv.jpg' },
  { title: '怪诞毕业照', video: '/assets/media/aimv/graduation-photo.mp4', image: '/assets/media/aimv/graduation-photo.jpg' },
  { title: '氛围发丝', video: '/assets/media/aimv/hair-atmosphere.mp4', image: '/assets/media/aimv/hair-atmosphere.jpg' },
  { title: '雨夜唱片店', video: '/assets/media/aimv/rainy-record-store.mp4', image: '/assets/media/aimv/rainy-record-store.jpg' },
  { title: '新加坡打卡', video: '/assets/media/aimv/singapore-checkin.mp4', image: '/assets/media/aimv/singapore-checkin.jpg' },
  { title: '开学季', video: '/assets/media/aimv/back-to-school.mp4', image: '/assets/media/aimv/back-to-school.jpg' }
]

export default function AimvShowcase(){
  const [active,setActive]=useState(0)
  const [playing,setPlaying]=useState(null)
  const current=aimvWorks[active]
  useEffect(()=>{document.body.style.overflow=playing?'hidden':'';return()=>{document.body.style.overflow=''}},[playing])
  return <section className="aimv-case shell reveal" id="aimv">
    <div className="aimv-heading">
      <div><p>AI MUSIC VIDEO · SELECTED WORK</p><h2>AIMV</h2></div>
      <p>以音乐氛围为起点，完成竖屏影像的画面设计、节奏组织与视觉表达。</p>
    </div>
    <div className="aimv-layout">
      <div className="aimv-carousel-wrap">
        <DepthCarousel items={aimvWorks.map(work=>({image:work.image,alt:work.title}))} cardWidth={270} cardHeight={480} radius={8} depth={180} spread={78} tilt={18} perspective={1450} visibleCards={4} falloff={0.18} blur={4} loop showControls showIndicators onChange={index=>setActive(index)}/>
      </div>
      <div className="aimv-copy">
        <p className="aimv-index">{String(active+1).padStart(2,'0')} / {String(aimvWorks.length).padStart(2,'0')}</p>
        <h3>{current.title}</h3>
        <p>竖屏 AIMV 作品 · 视觉氛围与音乐节奏设计</p>
        <button type="button" onClick={()=>setPlaying(current)}>播放作品 <span>▶</span></button>
        <div className="aimv-list">{aimvWorks.map((work,index)=><button type="button" className={index===active?'is-active':''} key={work.title} onClick={()=>setActive(index)}><i>{String(index+1).padStart(2,'0')}</i>{work.title}</button>)}</div>
      </div>
    </div>
    {playing&&<div className="aimv-player" role="dialog" aria-modal="true" aria-label={playing.title} onClick={()=>setPlaying(null)}><button className="aimv-close" type="button" onClick={()=>setPlaying(null)}>关闭 ×</button><div onClick={event=>event.stopPropagation()}><video src={playing.video} poster={playing.image} controls autoPlay playsInline/></div></div>}
  </section>
}
