const getData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const dataArray = data.posts;

    console.log(dataArray)
};



getData();