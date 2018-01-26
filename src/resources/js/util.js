// Utility functions

// Code was written by Tyler Akins and is placed in the public domain
// It would be nice if you left this header.  http://rumkin.com


// Remove whitespace from beginning and end of text
function Trim(s)
{
   while (s.length && " \t\r\n".indexOf(s.charAt(0)) >= 0)
   {
      s = s.slice(1, s.length);
   }
   while (s.length && " \t\r\n".indexOf(s.charAt(s.length - 1)) >= 0)
   {
      s = s.slice(0, s.length - 1);
   }

   return s;
}


// Exchange characters in F for ones in T for the string S.  If T is not
// specified or not long enough, the characters are removed.
// "abCabC" = Tr("ABC", "ABc", "ab!")
// "test thing" = Tr("Test\n thing", "\r\n")
function Tr(s, f, t)
{
   var o = '';

   if (typeof(t) != 'string')
   {
      t = '';
   }

   for (var i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      var idx = f.indexOf(c);
      if (idx >= 0)
      {
         if (idx < t.length)
	 {
            o += t.charAt(idx);
	 }
      }
      else
      {
         o += c;
      }
   }

   return o;
}


// Insert CR and LF characters into e, based on the position of those
// characters in T.
// If T = "ab\ncd" and E = "zyxw", the result will be "zy\nxw"
function InsertCRLF(t, e)
{
   var o = "", i, j;

   for (i = 0, j = 0; i < t.length; i ++)
   {
      if ("\r\n".indexOf(t.charAt(i)) >= 0)
      {
         o += t.charAt(i);
      }
      else
      {
         o += e.charAt(j ++);
      }
   }

   return o;
}


// Returns an alphabet with a key in front.
// Passing the key of "Four. Score! And Seven Days Ago?"
// will return  "FOURSCEANDVYGBHIJKLMPQTWXZ"
// key = the letters to include in the beginning
// alphaet = the alphabet to use (if not A-Z)


// Make any string contain just alpha characters in upper case.
function OnlyAlpha(str)
{
   var out = "";

   str = str.toUpperCase();
   for (i = 0; i < str.length; i ++)
   {
      var b = str.charAt(i);
      if (b >= 'A' && b <= 'Z')
      {
         out += b;
      }
   }

   return out;
}


// Change a string into valid HTML text
function HTMLEscape(str)
{
   var out = "";

   for (var i = 0; i < str.length; i ++)
   {
      var c = str.charAt(i);
      if (c == '&')
         c = '&amp;';
      if (c == '>')
         c = '&gt;';
      if (c == '<')
         c = '&lt;';
      if (c == "\n")
         c = "<br>\n";
      out += c;
   }

   return out;
}


// Pass it a textarea object, get it resized automagically
function ResizeTextArea(obj)
{
   var s = obj.value + "\n";
   var newlines = 0;
   var max_chars = 0;
   var i, chars = 0, wide = 0;
   var obj_max_cols = 100, obj_min_cols = 40, obj_max_rows = 15;
   var scrollbar_width = 2;

   for (i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      if (c == "\n")
      {
         if (max_chars < chars)
	    max_chars = chars;
	 chars = 0;
	 newlines ++;
      }
      else
      {
         if (chars == obj_max_cols - scrollbar_width)
         {
	    max_chars = chars;
            j = i;
	    var c2 = s.charAt(j);
	    while (c2 != "\n" && c2 != ' ' && c2 != "\t" && j > 0)
	    {
	       j --;
	       c2 = s.charAt(j);
	    }
	    if (c2 != "\n" && j > 0)
	    {
	       // Not one big long line
	       newlines ++;
	       chars = 0;
	       i = j;
	    }
	    else
	    {
	       wide = 1;
	    }
         }
         else
         {
            chars ++;
         }
      }
   }

   obj.rows = Math.min(obj_max_rows, newlines + wide + 1);
   obj.cols = Math.min(Math.max(obj_min_cols, max_chars + scrollbar_width), obj_max_cols);
}

function Reverse_String(s)
{
   var o = '', i = s.length;

   while (i --)
   {
      o += s.charAt(i);
   }

   return o;
}

// Returns 1 if there was no change, 0 if it is not the same
// Saves value in the element if it was changed, so subsequent calls
// to this function will return 1 until it changes again.
// Don't use this function like this:
//   if (IsUnchanged(x) && IsUnchanged(y) && IsUnchanged(z)) { ... }
// The logic code could short-circuit on X or Z (depending on how it
// gets parsed) and will jump to the 'if' block without evaluating
// all of the variables.  Use this instead:
//   if (IsUnchanged(x) * IsUnchanged(y) * IsUnchanged(z)) { ... }
//   if (IsUnchanged(x) + IsUnchanged(y) + IsUnchanged(z) == 3) { ... }
function IsUnchanged(e)
{
   var v;

   if (e.type == 'checkbox')
   {
      v = e.checked.toString();
   }
   else
   {
      v = e.value;
   }

   if (v != e.getAttribute('_oldValue'))
   {
      e.setAttribute('_oldValue', v);
      return 0;
   }

   return 1;
}


document.Util_Loaded = 1;
