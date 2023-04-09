//API URL: https://opentdb.com/api.php?amount=20

async function Main() {
    const response = await fetch("https://opentdb.com/api.php?amount=20");
    const data = await response.json();

    console.log(data);
}

Main();