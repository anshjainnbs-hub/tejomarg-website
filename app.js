// TEJOMARG — shared behaviour
(function(){
  const nav = document.getElementById('nav');
  if (nav){
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, {passive:true});
  }
  const burger = document.getElementById('burger');
  const links = document.getElementById('navlinks');
  if (burger && links){
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Enquiry form → emails to info@tejomarg.in via FormSubmit (AJAX for inline feedback)
  const ef = document.getElementById('enquiryForm');
  if (ef){
    ef.addEventListener('submit', async e => {
      e.preventDefault();
      const st = document.getElementById('formStatus');
      const btn = ef.querySelector('button[type=submit]');
      const orig = btn.textContent;
      st.className = 'form-status'; st.textContent = '';
      btn.disabled = true; btn.textContent = 'Sending…';
      try{
        const res = await fetch('https://formsubmit.co/ajax/info@tejomarg.in', {
          method:'POST', headers:{'Accept':'application/json'}, body:new FormData(ef)
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok){
          st.className = 'form-status ok';
          st.textContent = 'Thank you — your enquiry has been sent. We’ll be in touch shortly.';
          ef.reset();
        } else { throw new Error(data.message || 'failed'); }
      }catch(err){
        st.className = 'form-status err';
        st.innerHTML = 'Sorry, something went wrong. Please email <a href="mailto:info@tejomarg.in">info@tejomarg.in</a> directly.';
      }finally{ btn.disabled = false; btn.textContent = orig; }
    });
  }
  if (new URLSearchParams(location.search).get('sent') === '1'){
    const st = document.getElementById('formStatus');
    if (st){ st.className = 'form-status ok'; st.textContent = 'Thank you — your enquiry has been sent. We’ll be in touch shortly.'; }
  }
})();
