function getNavHeight() {
	const nav = document.querySelector('nav');
	return nav ? nav.offsetHeight : 0;
}

document.addEventListener('DOMContentLoaded', function () {
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
	const menuOverlay = document.querySelector('.menu-overlay');

	function closeMenu() {
		// Enable animation just for this action
		document.body.classList.add('nav-animating');

		// Change state
		navUl.classList.remove('open');
		if (menuOverlay) menuOverlay.classList.remove('active');
		mobileMenu.textContent = '☰';

		// Cleanup animation class after transition (300ms)
		setTimeout(() => {
			document.body.classList.remove('nav-animating');
		}, 300);
	}

	function openMenu() {
		document.body.classList.add('nav-animating');
		navUl.classList.add('open');
		if (menuOverlay) menuOverlay.classList.add('active');
		mobileMenu.textContent = '✕';

		setTimeout(() => {
			document.body.classList.remove('nav-animating');
		}, 300);
	}

	if (mobileMenu && navUl) {
		// Toggle Click
		mobileMenu.addEventListener('click', function () {
			const isOpen = navUl.classList.contains('open');
			isOpen ? closeMenu() : openMenu();
		});

		// Overlay Click
		if (menuOverlay) {
			menuOverlay.addEventListener('click', closeMenu);
		}

		// Close on Link Click
		navUl.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 768) closeMenu();
			});
		});
	}

	const pricingSwitch = document.getElementById('pricing-switch');
	if (pricingSwitch) {
		pricingSwitch.addEventListener('change', function () {
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

	// Resize Handler (Prevents ghosting)
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			if (window.innerWidth > 768 && navUl) {
				// Instantly remove classes without animation
				navUl.classList.remove('open');
				if (menuOverlay) menuOverlay.classList.remove('active');
				if (mobileMenu) mobileMenu.textContent = '☰';
			}
		}, 150);
	});
});

window.addEventListener('hashchange', function () {
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