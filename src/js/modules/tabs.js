function tabs(tabContentSelector, tabMenuSelector, tabMenuHeader, activeClass) {
    const tabs = document.querySelectorAll(tabContentSelector),
        tabHeaderItemsParent = document.querySelector(tabMenuSelector),
        tabHeaderItems = tabHeaderItemsParent.querySelectorAll(tabMenuHeader);

    tabHeaderItemsParent.addEventListener("click", event => {
        const target = event.target;

        if (target && target.classList.contains(tabMenuHeader.slice(1))) {
            tabHeaderItems.forEach((item, i) => {
                if (item == target) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });

    const hideTabs = () => {
        tabs.forEach(item => {
            item.classList.remove("show", "fade");
            item.classList.add("hide");
        });

        tabHeaderItems.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    const showTab = (i = 0) => {
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show", "fade");
        tabHeaderItems[i].classList.add(activeClass);
    };

    hideTabs();
    showTab();
}

export default tabs;