
(function(){
    const label = () => (typeof S !== 'undefined' && S.lang === 'ar') ? 'إغلاق التنبيه' : 'Dismiss warning';
    function decorate(root){
        const nodes=[];
        if(root instanceof Element && root.matches('.warn')) nodes.push(root);
        if(root.querySelectorAll) nodes.push(...root.querySelectorAll('.warn'));
        for(const node of nodes){
            if(node.dataset.noDismiss === 'true' || node.querySelector('.warn-dismiss')) continue;
            const close=document.createElement('button');
            close.type='button'; close.className='warn-dismiss'; close.setAttribute('aria-label',label()); close.textContent='×';
            node.appendChild(close);
        }
    }
    document.addEventListener('click',function(event){
        const close=event.target.closest('.warn-dismiss'); if(!close) return;
        event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
        const warning=close.closest('.warn'); if(!warning) return;
        if(warning.getAttribute('role')==='alertdialog'){
            const cancel=warning.querySelector('[data-act="wipe0"],[data-act="bkno"],[data-act="cancel"]');
            if(cancel){ cancel.click(); return; }
        }
        warning.hidden=true;
    },true);
    decorate(document);
    new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(decorate))).observe(document.body,{childList:true,subtree:true});
})();
