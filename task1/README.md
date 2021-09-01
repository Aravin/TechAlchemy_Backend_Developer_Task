# Task 1

You are a developer who accidently went back in time. You can’t return back to your timeline
because you Time machine need to sort array from 10 Gigabytes of unsorted integer data. The
problem in front of you is Machine during that time was not that advanced. You find a device with 1
gigs of ram and 240 Gigabyte of hard drive.

- They are all integers [0,65,535] like 10,5,98,32,22,87,5,6,9 etc.
- Same integer values can be repeatedly appearing in the file.

Create a function to read 10 gigabytes of data and sort it. (Pseudo code and logic will also work)

## Solution

- We can solve this problem using Bit Vector.
- It can be solved using 2 passes.
- Since we have only 1GB of RAM, we can divide the integer into block of smaller size.
- Example 0-999, 1000-2000 and so on.
- For each iteration, find the element within (0-999, 1000-2000) the current block.
- If the finding in each iteration is lesser than the block then we can assume the integer is missing.
- In the second pass, we have to find for missing range using Bit Vector.

## Block Size

Array to fit 1GB -> 1 Gigabytes = 1073741824 Bytes

Size of each Array is 4 bytes

So, we can allocate 1073741824 / 4 => 26,84,35,456 size of Array

We can take 80% of Memory => 21,47,48,364 (per iteration)
