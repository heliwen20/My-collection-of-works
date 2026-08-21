import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import AudioShowcase from './AudioShowcase'
import './PresentationPreview.css'
import './FloatingNavigation.css'
import './ResumeProfile.css'
import './PlayerRefinement.css'
const MixerCase=lazy(()=>import('./MixerCase'))
function DeferredMixer(){const ref=useRef(null),[ready,setReady]=useState(false);useEffect(()=>{const node=ref.current;if(!node)return;if(!('IntersectionObserver'in window)){setReady(true);return}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);observer.disconnect()}},{rootMargin:'1200px 0px'});observer.observe(node);return()=>observer.disconnect()},[]);return <div id="mixer" ref={ref} className="deferred-mixer" style={ready?undefined:{minHeight:'900px'}}>{ready?<Suspense fallback={null}><MixerCase/></Suspense>:null}</div>}
const videoWorks=[{no:'01',title:'杜比全景声《失物招领》',image:'/assets/media/lost-and-found-poster.jpg',video:'/assets/media/lost-and-found.mp4',bilibili:'BV1gZ8i6NEyB',presentation:'/assets/media/lost-and-found-presentation.pptx'},{no:'02',title:'全景声《英雄联盟》',image:'/assets/media/league-of-legends-poster.jpg',video:'/assets/media/league-of-legends-web.mp4',bilibili:'BV1Qd8i6vEmB'}]
const audioWorks=[{no:'01',title:'全景声分轨混音《NUVOLE》',duration:'03:28',seed:5,src:'/assets/media/nuvole-atmos-mix.wav'},{no:'02',title:'2023第五届丹尼大赛入围复赛',duration:'03:45',seed:7,src:'/assets/media/dannie-2022-mix.mp3'},{no:'03',title:'原创录混《孤独星球》',duration:'04:07',seed:13,src:'/assets/media/lonely-planet-original-mix.wav'},{no:'04',title:'《清白之年》',duration:'04:29',seed:11,src:'/assets/media/innocent-years.mp3'},{no:'05',title:'《野有蔓草》',duration:'04:17',seed:3,src:'/assets/media/wild-grass.mp3'}]
const experience=[['2023.09 — 至今','腾讯音乐娱乐有限公司','腾讯全民K歌业务线 · 产品运营','负责会员权益、音效内容与产品功能运营，覆盖调音台、人声增强、AI 降噪、均衡及母带模板；协同研发、设计、算法和内容团队推进功能配置、验收与上线。'],['2023.01 — 2023.03','广西民族音乐博物馆','录音师','负责民族乐器现场录音，并独立完成素材剪辑、降噪和混音处理，为省级创新项目提供音频样本支持。'],['2022.10 — 2022.12','南宁广播电视台','后期编辑','完成城市文化系列音频的剪辑、音效设计与氛围铺垫，并参与内容审核和新媒体发布协作。']]
function Waveform({seed,active}){return <div className={'waveform '+(active?'active':'')} aria-hidden="true">{Array.from({length:44},(_,i)=><i key={i} style={{height:`${8+Math.abs(Math.sin((i+seed)*.73)*30)+Math.abs(Math.cos((i+seed)*.29)*16)}%`,animationDelay:`${i*28}ms`}}/>)}</div>}
function App(){const[menuOpen,setMenuOpen]=useState(false),[selectedVideo,setSelectedVideo]=useState(null),[presentationOpen,setPresentationOpen]=useState(false),[presentationSlide,setPresentationSlide]=useState(0),[navFloating,setNavFloating]=useState(false),[activeNav,setActiveNav]=useState('work');const videoDialog=useRef(null),navFloatingRef=useRef(false),activeNavRef=useRef('work'),sectionRefs=useRef([]);useEffect(()=>{const nodes=[...document.querySelectorAll('.reveal')];if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){nodes.forEach(el=>el.classList.add('visible'));return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'80px 0px'});nodes.forEach(el=>observer.observe(el));return()=>observer.disconnect()},[]);useEffect(()=>{  let frame=0;  const refreshSections=()=>{sectionRefs.current=['work','audio','mixer','headphone','social','about'].map(id=>{const node=document.getElementById(id);return node?{id,top:node.offsetTop}:null}).filter(Boolean)};  const commit=()=>{    frame=0;    const floating=window.scrollY>=window.innerHeight*.9;    if(floating!==navFloatingRef.current){navFloatingRef.current=floating;setNavFloating(floating)}    const point=window.scrollY+140;    let current='work';    for(const section of sectionRefs.current){if(section.top<=point)current=section.id;else break}    if(current!==activeNavRef.current){activeNavRef.current=current;setActiveNav(current)}  };  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(commit)};  const onResize=()=>{refreshSections();onScroll()};  refreshSections();commit();  addEventListener('scroll',onScroll,{passive:true});  addEventListener('resize',onResize,{passive:true});  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',onScroll);removeEventListener('resize',onResize)}},[]);const openVideo=work=>{setSelectedVideo(work);videoDialog.current?.showModal()};return <main>
<header className={'site-head shell '+(navFloating?'is-floating':'')}><a className="brand" href="#work"><b>LIWEN HE</b></a><button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?'关闭':'菜单'}</button><nav className={menuOpen?'open':''}><a className={activeNav==='work'?'active':''} href="#work">CG</a><a className={activeNav==='audio'?'active':''} href="#audio">音频</a><a className={activeNav==='mixer'?'active':''} href="#mixer">K歌调音台</a><a className={activeNav==='headphone'?'active':''} href="#headphone">耳机音效</a><a className={activeNav==='social'?'active':''} href="#social">社媒</a><a className={activeNav==='about'?'active':''} href="#about">关于</a></nav><a className="nav-contact" href="#contact">联系我</a></header>
<section className="resume-section shell" id="about"><div className="resume-heading reveal"><div><p className="section-kicker">PROFILE · EXPERIENCE</p><h2>个人履历</h2></div><span className="signal-line"/></div><div className="resume-layout"><aside className="resume-aside reveal"><div className="resume-photo"><img loading="lazy" decoding="async" src="/assets/portrait.jpg" alt="何丽雯职业照"/></div><p className="section-kicker">EDUCATION</p><h3>广西艺术学院</h3><p>录音艺术专业<br/>2019.09 — 2023.06</p></aside><div className="timeline">{experience.map((item,i)=><article className="resume-item reveal" key={item[1]}><span>0{i+1}</span><time>{item[0]}</time><div><h3>{item[1]}</h3><h4>{item[2]}</h4><p>{item[3]}</p></div></article>)}</div></div></section>
<section className="sound-section shell" id="work"><div className="hero-title reveal"><p>PORTFOLIO · 2026</p><h1>音效设计</h1><div className="mic"/></div><div className="video-grid">{videoWorks.map(work=><article className="video-card reveal" key={work.no}><button className="video-cover" onClick={()=>openVideo(work)}><img src={work.image} alt="" loading={work.no==='01'?'eager':'lazy'} fetchPriority={work.no==='01'?'high':'auto'} decoding="async"/><span className="video-shade"/><span className="play large">▶</span></button><div className="video-meta"><b>{work.no}</b><h2>{work.title}</h2><span>SOUND DESIGN</span></div>{work.presentation&&<button className="presentation-link" type="button" onClick={()=>{setPresentationSlide(0);setPresentationOpen(true)}}><span>06</span><b>《失物招领》讲解</b><i>查看图文 ↗</i></button>}</article>)}</div></section>
<AudioShowcase/>
<DeferredMixer/>
<section className="kpods-case shell reveal" id="headphone">
 <div className="kpods-top">
  <div className="kpods-intro">
   <p className="section-kicker">SELECTED WORK · SOUND EFFECT PRODUCTION</p>
   <h2>KPods Pro<br/>耳机音效制作</h2>
   <p className="kpods-role">个人职责：耳机音效制作与听感优化</p>
   <p className="kpods-summary">面向移动端 K 歌与实时返听场景，参与 KPods Pro 耳机内置音效制作，完成 11 款不同听感方向的音效方案。通过多轮 Demo 听评与参数调整，持续优化不同人声素材和演唱风格下的声音表现。</p>
   <div className="kpods-results">
    <div><b>11<small>款</small></b><span>耳机内置音效</span></div>
    <div><b>多轮</b><span>Demo 听评与调优</span></div>
    <div><b>多类</b><span>人声及演唱素材验证</span></div>
    <div><b>耳机端</b><span>最终效果落地</span></div>
   </div>
   <div className="kpods-process">
    <h3>音效制作流程</h3>
    <div className="kpods-process-track">
     {[['01','需求理解','梳理场景与听感目标'],['02','音效制作','完成初版音效方案'],['03','Demo 听评','多轮内测与主观听评'],['04','调整优化','参数调整与素材验证'],['05','效果验收','定稿检查与版本交付']].map((item,i)=><div className="kpods-step" key={item[0]}><i>{i===0?'◎':i===1?'⌘':i===2?'…':i===3?'≋':'✓'}</i><b>{item[0]}</b><strong>{item[1]}</strong><span>{item[2]}</span></div>)}
    </div>
   </div>
  </div>
  <div className="kpods-gallery">
   <h3>最终落地场景</h3>
   <figure className="kpods-poster"><img loading="lazy" decoding="async" src="/assets/media/kpods-case/product-overview.webp" alt="KPods Pro 耳机音效应用场景"/></figure>
   <div className="kpods-screens">
    <figure><img loading="lazy" decoding="async" src="/assets/media/kpods-case/singing-scene.webp" alt="全民K歌演唱页面"/></figure>
    <figure><img loading="lazy" decoding="async" src="/assets/media/kpods-case/monitoring-01.webp" alt="KPods Pro 返听调音页面一"/></figure>
    <figure><img loading="lazy" decoding="async" src="/assets/media/kpods-case/monitoring-02.webp" alt="KPods Pro 返听调音页面二"/></figure>
   </div>
  </div>
 </div>
</section><section className="social-case shell reveal" id="social">
 <div className="social-overview">
  <div className="social-copy">
   <p className="section-kicker">CONTENT OPERATION · SOCIAL MEDIA</p>
   <h2>社媒全平台<br/>内容运营</h2>
   <p className="social-role">独立负责 · 多平台矩阵运营</p>
   <p>独立负责抖音、视频号、小红书三大核心平台的账号搭建与日常内容运营，围绕「麦恩莉」账号持续策划并产出高传播内容。</p>
  </div>
  <div className="social-metrics">
   <article><i>◌</i><span>抖音</span><b>134.6W</b><small>单条最高播放</small></article>
   <article><i>◇</i><span>视频号</span><b>25.4W</b><small>单条最高播放</small></article>
   <article className="is-highest"><i>◎</i><span>小红书</span><b>173.4W</b><small>单条最高播放</small></article>
  </div>
 </div>
 <div className="social-evidence">
  <div className="social-evidence-title"><h3>数据表现 · 内容案例</h3><p>点击播放查看作品录屏</p></div>
  <div className="social-recordings">
   {[['抖音','134.6W','/assets/media/social-recordings/douyin-web.mp4','/assets/media/social-recordings/douyin-poster.jpg'],['视频号','25.4W','/assets/media/social-recordings/wechat-channels-web.mp4','/assets/media/social-recordings/wechat-channels-poster.jpg'],['小红书','173.4W','/assets/media/social-recordings/xiaohongshu-web.mp4','/assets/media/social-recordings/xiaohongshu-poster.jpg']].map(item=><article key={item[0]}><video className="social-recording-video" controls preload="none" playsInline poster={item[3]} aria-label={item[0]+'作品录屏'}><source src={item[2]} type="video/mp4"/></video><div><b>{item[0]}</b><span>单条最高播放 <strong>{item[1]}</strong></span></div></article>)}
  </div>
 </div>
</section>
<footer className="contact-section shell" id="contact"><p className="section-kicker">CONTACT</p><h2>一起创造<br/>值得被听见的作品。</h2><a className="email" href="mailto:heliwen20@gmail.com">heliwen20@gmail.com <span>↗</span></a><div className="footer-line"><span>© 2026 LIWEN HE</span><span>SHANGHAI / CHINA</span><a href="#work">返回顶部 ↑</a></div></footer>
<dialog ref={videoDialog} className="video-dialog" onClose={()=>setSelectedVideo(null)}><button onClick={()=>videoDialog.current?.close()}>×</button>{selectedVideo?.bilibili?<iframe key={selectedVideo.bilibili} src={`https://player.bilibili.com/player.html?bvid=${selectedVideo.bilibili}&page=1&high_quality=1&danmaku=0&autoplay=1`} title={selectedVideo.title} scrolling="no" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/>:<video key={selectedVideo?.video} controls autoPlay playsInline preload="none" poster={selectedVideo?.image}><source src={selectedVideo?.video} type="video/mp4"/></video>}<p>{selectedVideo?.title}</p></dialog>
{presentationOpen&&<div className="presentation-preview" role="dialog" aria-modal="true" aria-label="《失物招领》讲解图片预览" onClick={e=>{if(e.target===e.currentTarget)setPresentationOpen(false)}}><div><header><b>《失物招领》讲解</b><span>{String(presentationSlide+1).padStart(2,'0')} / 06</span><button type="button" onClick={()=>setPresentationOpen(false)} aria-label="关闭预览">×</button></header><div className="presentation-stage"><button className="presentation-arrow presentation-arrow--prev" type="button" onClick={()=>setPresentationSlide((presentationSlide+5)%6)} aria-label="上一页">←</button><img src={`/assets/media/lost-and-found-slides/slide-${presentationSlide+1}.webp`} alt={`《失物招领》讲解第 ${presentationSlide+1} 页`} decoding="async"/><button className="presentation-arrow presentation-arrow--next" type="button" onClick={()=>setPresentationSlide((presentationSlide+1)%6)} aria-label="下一页">→</button></div><div className="presentation-dots">{Array.from({length:6},(_,i)=><button key={i} className={presentationSlide===i?'active':''} type="button" onClick={()=>setPresentationSlide(i)} aria-label={`查看第 ${i+1} 页`}/>)}</div></div></div>}
</main>}
createRoot(document.getElementById('root')).render(<App/>)













