function getNavHeight() {
	const nav = document.querySelector('nav');
	return nav ? nav.offsetHeight : 0;
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('current-year').textContent = new Date().getFullYear();

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const target = document.querySelector(targetId);
			if (target) {
				const navHeight = getNavHeight();
				const targetOffset = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
				window.scrollTo({
					top: targetOffset,
					behavior: 'smooth'
				});
			}
		});
	});

	if (window.location.hash) {
		const hashTarget = document.querySelector(window.location.hash);
		if (hashTarget) {
			setTimeout(() => {
				const navHeight = getNavHeight();
				const targetOffset = hashTarget.getBoundingClientRect().top + window.pageYOffset - navHeight;
				window.scrollTo({
					top: targetOffset,
					behavior: 'smooth'
				});
			}, 100);
		}
	}

	const mobileMenu = document.querySelector('.mobile-menu');
	const navUl = document.querySelector('nav ul');
	if (mobileMenu && navUl) {
		mobileMenu.addEventListener('click', function() {
			const isOpen = navUl.style.display === 'flex';
			if (isOpen) {
				navUl.style.display = 'none';
			} else {
				Object.assign(navUl.style, {
					display: 'flex',
					flexDirection: 'column',
					position: 'absolute',
					top: '100%',
					left: '0',
					right: '0',
					background: '#fff',
					padding: '1rem 5%',
					boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
					gap: '1rem',
					zIndex: '999'
				});
			}
		});
		
		navUl.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 768) {
					navUl.style.display = 'none';
				}
			});
		});
	}
	
	const pricingSwitch = document.getElementById('pricing-switch');
	if (pricingSwitch) {
		pricingSwitch.addEventListener('change', function() {
			const monthlyElements = document.querySelectorAll('.price-monthly');
			const yearlyElements = document.querySelectorAll('.price-yearly');
			if (this.checked) {
				monthlyElements.forEach(el => el.style.display = 'none');
				yearlyElements.forEach(el => el.style.display = 'block');
			} else {
				monthlyElements.forEach(el => el.style.display = 'block');
				yearlyElements.forEach(el => el.style.display = 'none');
			}
		});
	}
	
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			if (window.innerWidth > 768 && navUl) {
				navUl.style.cssText = '';
			}
		}, 150);
	});
});

window.addEventListener('hashchange', function() {
	if (window.location.hash) {
		const hashTarget = document.querySelector(window.location.hash);
		if (hashTarget) {
			setTimeout(() => {
				const navHeight = getNavHeight();
				const targetOffset = hashTarget.getBoundingClientRect().top + window.pageYOffset - navHeight;
				window.scrollTo({
					top: targetOffset,
					behavior: 'smooth'
				});
			}, 100);
		}
	}
});

document.querySelectorAll('video').forEach(video => {
  let savedScrollY = 0;
  let orientation = screen.orientation?.angle || 0;
  
  const saveScroll = () => { 
	savedScrollY = window.scrollY;
	orientation = screen.orientation?.angle || 0;
  };
  
  video.addEventListener('webkitbeginfullscreen', saveScroll);
  video.addEventListener('fullscreenchange', () => {
	if (document.fullscreenElement) {
	  saveScroll();
	}
  });
  
  const restoreScroll = () => {
	if (!document.fullscreenElement && !document.pictureInPictureElement) {
	  const currentOrientation = screen.orientation?.angle || 0;
	  if (orientation === currentOrientation) {
		requestAnimationFrame(() => {
		  window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
		});
	  }
	}
  };
  
  video.addEventListener('webkitendfullscreen', restoreScroll);
  video.addEventListener('fullscreenchange', restoreScroll);
  video.addEventListener('leavepictureinpicture', restoreScroll);
});