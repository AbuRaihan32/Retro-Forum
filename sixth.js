const getData = async (inputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`);
    const data = await res.json();
    const dataArray = data.posts;

    displayData(dataArray);
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
            <div class="avatar online offline">
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
                    <button onclick="onclickBtn('${(item.title)}', '${(item.view_count)}')" ><img src="images/massege.svg" alt=""></button>
                </div>
            </div>
        </div>
        `
        postContainer.appendChild(div);
    })
    
    const activeDiv = document.getElementsByClassName('avatar');
    dataArray.forEach(item=>{
            // console.log(activeDiv[2])
            if(!item.isActive){
                activeDiv[2].classList.remove('offline')
            }else{
                activeDiv[2].classList.remove('online')
            }
    })

};


const clickHandler = () => {
    const inputValue = document.getElementById('inputField').value;
    getData(inputValue)
}

const onclickBtn = (title, vewCount)=>{
    const countElement = document.getElementById('current-marked-count');
    const countText = countElement.innerText;
    const currentMarkedCount = parseInt(countText);
    const currentCount = currentMarkedCount + 1;
    countElement.innerText = currentCount;

    const markAsReadContainer = document.getElementById('mark-as-read-container');

    const div = document.createElement('div');
    div.classList = `flex p-3 bg-white rounded-xl mt-2`;
    div.innerHTML = `
        <div class="w-full flex justify-between">
            <div class="w-[70%]">
                <p class="font-semibold ">${title}</p>
            </div>
            <div class="flex items-center w-[30%] justify-end">
                <p><i class="fa-regular fa-eye"></i></p>
                <p>&#160 <span> ${vewCount} </span> </p>
            </div>
        </div>
    `
    markAsReadContainer.appendChild(div);
};

const getLatestPost = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestPost = await res.json();
    displayLatestPost(latestPost);
}

const displayLatestPost = (latestPost) => {

    const latestPostContainer = document.getElementById('latest-Post-Container')
    latestPost.forEach(post=>{
        const div = document.createElement('div');
        div.classList=`card bg-base-100 shadow-xl`
        div.innerHTML=`
        <div class="rounded-2xl">
            <img class="p-7" src="${post.cover_image}" />
        </div>
        <div class="card-body">
            <p><i class="fa-regular fa-calendar-days"></i><span> &#160 ${post.author.posted_date? post.author.posted_date : 'No Posted Date'}</span></p>
            <h2 class="card-title">${post.title}</h2>
            <p>${post.description}</p>
            <div class="flex items-center gap-9 ">
                <div class="w-[30%]">
                    <img class="rounded-full" src="${post.profile_image}" alt="">
                </div>

                <div class="w-full">
                    <p>${post.author.name? post.author.name : 'No Name'}</p>
                    <p>${post.author.designation? post.author.designation : 'Unknown'}</p>
                </div>
            </div>
        </div>
        `
        latestPostContainer.appendChild(div);
    })
}

getData('Comedy');
getLatestPost();