const users = {};

fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        for (const user of data){
          users[user.username] = {
            password: user.password,
            points: user.points,
            id: user.id,
          }
        }
      })