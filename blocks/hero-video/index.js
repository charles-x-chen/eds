import styles from './hero-video.module.css';

export default function decorate(block) {
    const [urlDiv, mobileUrlDiv, overlayDiv] = [...block.children].map((row) => row.firstElementChild);
    const media = window.matchMedia('(min-width: 900px)');
    const isDesktop = media.matches;
    const desktopUrl = urlDiv.innerText;
    const mobileUrl = mobileUrlDiv.innerText;
    const url = isDesktop ? desktopUrl : mobileUrl;
    const video = decorateVideo(url);

    media.onchange = (event) => {
        const isDesktop = event.matches;
        video.src = isDesktop ? desktopUrl : mobileUrl;
    };

    urlDiv.replaceChildren(video);
    block.classList.add(styles.root);
    for (const link of block.querySelectorAll('.button')) {
        link.classList.add(styles.videoAction);
    }
    video.classList.add(styles.video);
    overlayDiv.classList.add(styles.overlay);
    mobileUrlDiv.parentNode.removeChild(mobileUrlDiv);
    try {
        return video.play();
    } catch {}
}

function decorateVideo(url) {
    const video = document.createElement('video');
    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.src = url;
    return video;
}
