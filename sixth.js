const getData = async (inputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`);
    const data = await res.json();
    const dataArray = data.posts;

    displayData(dataArray)
};

const displayData = (dataArray) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ``
    dataArray.forEach(item => {
        const div = document.createElement('div');
        div.classList = `bg-[#797DFC1A] p-5 text-center lg:text-start lg:p-10 lg:flex lg:gap-6 rounded-3xl`;

        div.innerHTML = `
        <!-- avatar -->
        <div class="flex justify-center lg:inline-block">
            <div id="avatar-div" class="avatar online">
                <div class="w-24 rounded-full">
                    <img src="${item.image}"/>
                </div>
            </div>
        </div>
        <div>
            <span># <span>${item.category}</span> &#160 &#160 &#160 </span>
            <span>Author : ${item.author.name}</span>
            <h1 class="text-xl font-bold">${item.title}</h1>
            <p class="lg:pr-28 pb-4 border-b-[3px] border-dashed mb-5">${item.description}</p>

            <!-- vew container -->
            <div class="flex justify-between">
                <div class="flex gap-6">
                    <p><span><i class="fa-regular fa-message"></i> &#160 </span>${item.comment_count}</p>

                    <p><span><i class="fa-regular fa-eye"></i> &#160 </span> ${item.view_count}</p>

                    <p><span><i class="fa-regular fa-clock"></i> &#160 </span> ${item.posted_time} &#160 min</p>
                </div>
                <div>
                    <button onclick="clickForMark()"><img src="images/massege.svg" alt=""></button>
                </div>
            </div>
        </div>
        `

        postContainer.appendChild(div)
    })
};


const clickHandler = () => {
    const inputValue = document.getElementById('inputField').value;
    getData(inputValue)
}

const clickForMark = () => {
    const countElement = document.getElementById('current-marked-count');
    const countText = countElement.innerText;
    const currentMarkedCount = parseInt(countText);
    const currentCount = currentMarkedCount + 1;
    countElement.innerText = currentCount;

    console.log(currentCount)
}

getData('Comedy');