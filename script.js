document.addEventListener('DOMContentLoaded', () => {

    // INICIALIZACIÓN DE LIBRERÍA DE ANIMACIONES AL HACER SCROLL
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }

    // CONTROL DEL MENÚ RESPONSIVO HÁMBURGUESA
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // FORMULARIO DEL FORO CON AGREGADO DINÁMICO DE OPINIONES
    const forumForm = document.getElementById('forumForm');
    const forumPostsContainer = document.getElementById('forumPostsContainer');

    if (forumForm && forumPostsContainer) {
        forumForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const role = document.getElementById('userRole').value;
            const comment = document.getElementById('userComment').value;

            const postHTML = `
                <div class="card" style="border-left: 4px solid var(--verde-acento);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h4 style="color: var(--azul-principal);">${escapeHTML(name)} ${role ? '(' + escapeHTML(role) + ')' : ''}</h4>
                        <small style="color: var(--texto-muted);">Hace un momento</small>
                    </div>
                    <p style="font-size: 0.95rem; color: var(--texto-muted);">
                        "${escapeHTML(comment)}"
                    </p>
                </div>
            `;

            forumPostsContainer.insertAdjacentHTML('afterbegin', postHTML);
            forumForm.reset();
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}