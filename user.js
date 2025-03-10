const response = await('http://localhost:800/users')

window.onload = () => {
    console.log('user page loaded');
    // 1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await(`${BASE_URL}/users`)
    
    console.log(response.data)
    
    const userDOM = ducument.getElemetByID('user')
    
    let htmlData ='<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<div>    
        ${user.id} ${user.firstname} ${user.lastman}
        <a href='index.html?id=${user.id}'><button>Edit<button>
        <button> class = 'delete' data-id='${user.id}'>delete</button>
        </div>`
    }    
    htmlData += '</div>'
    userDOM.innerHTML = htmlData
    //3. ลบ user
    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            // ดึง id = event.target.dataset.id
            const id = event.target.daraset.id
            try{
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData()//recursive function = เรียกใช้ฟังชั่นตัวเอง
            }catch (error){  
                comsole.log('error',error)             
            }
        })
    }
}