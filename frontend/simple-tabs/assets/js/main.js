const tabsContainer = document.querySelector('.tab-headers');

tabsContainer.addEventListener('click', (event) => {
    
    const clickedHeader = event.target.closest('.tab-header');
    if (!clickedHeader) {
        return;
    }


    const activeHeader = document.querySelector('.tab-header.active');
    const activeContent = document.querySelector('.tab-content.active');


    if (activeHeader) {
        activeHeader.classList.remove('active');
    }
    if (activeContent) {
        activeContent.classList.remove('active');
    }


    clickedHeader.classList.add('active');

    const targetTabId = clickedHeader.dataset.tab;
    const newActiveContent = document.getElementById(targetTabId);

    if (newActiveContent) {
        newActiveContent.classList.add('active');
    }
});
