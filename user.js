const BASE_URL = 'http://localhost:8000'
window.onload = async () => {
    await lodeData()
}
const lodeData = async () => {
    console.log('user page loaded');
    // 1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/user`);

    console.log(response.data);


    const userDOM = document.getElementById('user');
    // 2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html *แสดงเข้าไปที่ html*
    
    let htmlData = '<table>';
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.interests}</td>
        <td>${user.description}</td>
        <td class="actions">
            <a href='index1.html?id=${user.id}'><button class="btn-edit">Edit</button></a>
            <button class="btn-delete" data-id='${user.id}'>Delete</button>
        </td>
    </tr>`;
}
htmlData += '</table>'; 
    userDOM.innerHTML = htmlData;

    // 3. delete user
    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            // ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/user/${id}`)
                lodeData()
            } catch (error) {
                console.error('error',error)
            }
        });
    }
    const editButtons = document.getElementsByClassName('btn-edit'); 
    for (let button of editButtons) {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            window.location.href = `edit.html?id=${id}`;
        });
    }
}