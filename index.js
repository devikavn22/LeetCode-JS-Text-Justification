/*
Given an array of strings words and a width maxWidth, format the text such that 
each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you 
can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number 
of spaces on a line does not divide evenly between words, the empty slots on the left 
will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 

Example 1:

Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
Example 2:

Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", 
because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
*/

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const result = [];
  let line = [];
  let lineLength = 0;

  for (let word of words) {
    if (lineLength + line.length + word.length <= maxWidth) {
      line.push(word);
      lineLength += word.length;
    } else {
      result.push(justifyLine(line, maxWidth));
      line = [word];
      lineLength = word.length;
    }
  }

  // Handle the last line (left-justified)
  result.push(leftJustify(line, maxWidth));

  return result;
};

function justifyLine(words, maxWidth) {
  if (words.length === 1) {
    return words[0] + " ".repeat(maxWidth - words[0].length);
  }

  const totalSpaces = maxWidth - words.join("").length;
  const spaceCount = words.length - 1;
  const spacePerWord = Math.floor(totalSpaces / spaceCount);
  const extraSpaces = totalSpaces % spaceCount;

  let line = words[0];
  for (let i = 1; i < words.length; i++) {
    line += " ".repeat(spacePerWord + (i <= extraSpaces ? 1 : 0)) + words[i];
  }

  return line;
}

function leftJustify(words, maxWidth) {
  const line = words.join(" ");
  return line + " ".repeat(maxWidth - line.length);
}
console.log(
  fullJustify(
    ["This", "is", "an", "example", "of", "text", "justification."],
    16
  )
); // [ 'This    is    an', 'example  of text', 'justification.  ' ]

console.log(
  fullJustify(
    [
      "Science",
      "is",
      "what",
      "we",
      "understand",
      "well",
      "enough",
      "to",
      "explain",
      "to",
      "a",
      "computer.",
      "Art",
      "is",
      "everything",
      "else",
      "we",
      "do",
    ],
    20
  )
);
/* [
    'Science  is  what we',
    'understand      well',
    'enough to explain to',
    'a  computer.  Art is',
    'everything  else  we',
    'do                  '
  ] */

// SOLUTION is a simple greedy algorithm.
/*
This solution has a time complexity of O(N), where N is the total number of characters in the words array.

The space complexity of the above solution is O(N), where N is the total number of characters 
in the words array. The space complexity is primarily determined by the space 
required to store the result array, the line array, and the various string concatenations and 
space padding within the justifyLine and leftJustify functions. In the worst case, 
when there's only one word per line (no space padding), 
the space complexity is still O(N) because each word is added to the result array.
*/
