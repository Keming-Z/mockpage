(function () {
    var _descending = true;
    var _data = [];
    
    function getData() {
        var url = "./data.json";
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    _data = JSON.parse(request.responseText);
                    displayData(_data);
                }
            }
        }
        request.onerror = function () {
            console.log("XMLHttpRequest ERROR")
        };
        request.open('GET', url, true);
        request.send();
    }

    function displayData(data) {
        var rst = [];
        if (_descending === true) {
            rst = sortDescending(data);
        } else {
            rst = sortAsescending(data);
        }
        var content = document.getElementById("content");
        content.innerHTML = '';

        for (var i = 0; i < rst.length; i++) {
            if (i % 3 === 0) {
                var row = document.createElement('div');
                row.classList.add('row')
            }
            var box = document.createElement('div');
            box.classList.add('box');

            var image = document.createElement('img');
            image.src = "images/" + rst[i].image_name;
            box.appendChild(image);

            var info = document.createElement('div');
            info.classList.add('info');

            var title = document.createElement('div');
            title.classList.add('title');
            title.innerHTML = rst[i].title;
            info.appendChild(title);

            var fileName = document.createElement('div');
            fileName.classList.add('fileName');
            fileName.innerHTML = rst[i].image_name;
            info.appendChild(fileName);

            var br = document.createElement('br');
            info.appendChild(br);

            var des = document.createElement('p');
            des.classList.add('description');
            des.innerHTML = rst[i].description;
            info.appendChild(des);

            // var icons = document.createElement('div');
            // icons.classList.add('icons');
            // var favorite = document.createElement('i');
            // favorite.classList.add('material-icons');
            // favorite.innerHTML = 'favorite';
            // icons.appendChild(favorite);
            // var grade = document.createElement('i');
            // grade.classList.add('material-icons');
            // grade.innerHTML = 'grade';
            // icons.appendChild(grade);

            // info.appendChild(icons);

            box.appendChild(info)
            row.appendChild(box);
            content.appendChild(row);
        }
    }

    function sortDescending(data) {
        var rst = data.slice();
        rst.sort(function (data1, data2) {
            var title1 = data1.title.toLowerCase();
            var title2 = data2.title.toLowerCase();
            if (title1 < title2) {
                return 1;
            }
            if (title1 > title2) {
                return -1;
            }
            return 0;
        })
        return rst;
    }

    function sortAsescending(data) {
        var rst = data.slice();
        rst.sort(function (data1, data2) {
            var title1 = data1.title.toLowerCase();
            var title2 = data2.title.toLowerCase();
            if (title1 < title2) {
                return -1;
            }
            if (title1 > title2) {
                return 1;
            }
            return 0;
        })
        return rst;
    }

    window.onload = function () {
        getData();
        var a_z = document.getElementsByClassName("sort")[0];
        a_z.addEventListener("click", function () {
            if (_descending === true) {
                _descending = false;
                displayData(_data);
            } else {
                _descending = true;
                displayData(_data);
            }
        })
    }
})();