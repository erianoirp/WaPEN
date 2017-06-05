'use strict';

function editButton(add_cord)
{
	var sourceTextArea = document.getElementById("sourceTextarea");
	var pos = sourceTextArea.selectionStart;
	var cord = sourceTextArea.value;
	var cord1 = cord.slice(0, pos);
	var cord2 = cord.slice(pos, cord.length);
	var re1 = /[｜| 　]*$/;
	var re2 = /[｜| 　\n]/;
	var add_cords = add_cord.split("\n");
	var tab = "";
	var array = re1.exec(cord1);
	if(array != null) tab = array[0];
//	console.log("["+cord[pos]+"]");
	if((cord[pos] && cord[pos] != "\n") || (pos > 0 && !re2.exec(cord[pos - 1])))
	{
		alert("この位置で入力支援ボタンを押してはいけません");
		sourceTextArea.focus();
		return;
	}
	for(let c in add_cords) if(c > 0) add_cords[c] = tab + add_cords[c];
	if(cord[pos] == "\n" && cord1 != "" && tab == "")
	{
		cord1 += "\n";
		cord2 = cord2.substring(1);
	}
	sourceTextArea.value = cord1 + add_cords.join("\n") + cord2;
	sourceTextArea.selectionStart = sourceTextArea.selectionEnd = sourceTextArea.value.length - cord2.length;
	sourceTextArea.focus();
}

function keyUp()
{
	var sourceTextArea = document.getElementById("sourceTextarea");
	var pos = sourceTextArea.selectionStart;
	var cord = sourceTextArea.value;
	var cord1 = cord.slice(0, pos);
	var cord2 = cord.slice(pos + 1, cord.length);
	var re1 = /《[^》《]*$/;
	var re2 = /^[^》《]*》/;
	switch(window.event.keyCode)
	{
	case 39:
		if(pos > 0 && cord[pos - 1] == "《")
		{
			var match = re2.exec(cord2);
			if(match != null)
			{
				sourceTextArea.setSelectionRange(pos - 1, pos + match[0].length + 1);
				return false;
			}
		}
	case 37:
		if(cord[pos] == "》")
		{
			var match = re1.exec(cord1);
			if(match != null)
			{
				sourceTextArea.setSelectionRange(pos - match[0].length, pos + 1);
				return false;
			}
		}
		break;
	default:
//		console.log(window.event.keyCode);
		break;
	}
	return true;
}

function mouseClick()
{
	var sourceTextArea = document.getElementById("sourceTextarea");
	var pos = sourceTextArea.selectionStart;
	var cord = sourceTextArea.value;
	var cord1 = cord.slice(0, pos);
	var cord2 = cord.slice(pos, cord.length);
	var re1 = /《[^》《]*$/;
	var re2 = /^[^》《]*》/;
	var match1 = re1.exec(cord1);
	var match2 = re2.exec(cord2);
	if(match1 != null && match2 != null)
	{
		var start = pos - match1[0].length;
		var end = pos + match2[0].length;
		sourceTextArea.setSelectionRange(start, end);
	}
	
}
