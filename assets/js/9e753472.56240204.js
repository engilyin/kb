"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[2819],{4450:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"Job/TechInterview/Java/problem-solving/common-coding-problems","title":"common-coding-problems","description":"Common Coding Problems","source":"@site/docs/Job/TechInterview/Java/problem-solving/common-coding-problems.md","sourceDirName":"Job/TechInterview/Java/problem-solving","slug":"/Job/TechInterview/Java/problem-solving/common-coding-problems","permalink":"/kb/Job/TechInterview/Java/problem-solving/common-coding-problems","draft":false,"unlisted":false,"editUrl":"https://github.com/engilyin/kb/docs/Job/TechInterview/Java/problem-solving/common-coding-problems.md","tags":[],"version":"current","lastUpdatedAt":1727972934000,"frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"myanswers","permalink":"/kb/Job/TechInterview/Java/opinion/myanswers"},"next":{"title":"sql","permalink":"/kb/Job/TechInterview/Java/related/sql"}}');var t=r(4848),s=r(8453);const a={},o=void 0,l={},c=[{value:"Common Coding Problems",id:"common-coding-problems",level:2},{value:"Contains Duplicate",id:"contains-duplicate",level:3},{value:"Naive solution:",id:"naive-solution",level:4},{value:"By sorting:",id:"by-sorting",level:4},{value:"Using Set:",id:"using-set",level:4},{value:"Maximum Subarray",id:"maximum-subarray",level:3},{value:"Brute-force",id:"brute-force",level:4},{value:"Kadens algorithm",id:"kadens-algorithm",level:4},{value:"Merge Sorted Array (In-place)",id:"merge-sorted-array-in-place",level:3},{value:"Best Time to Buy and Sell Stock",id:"best-time-to-buy-and-sell-stock",level:3},{value:"Two Sum",id:"two-sum",level:3},{value:"Palindrome Number",id:"palindrome-number",level:3},{value:"Remove Duplicates from Sorted Array",id:"remove-duplicates-from-sorted-array",level:3},{value:"Max Consecutive Ones",id:"max-consecutive-ones",level:3},{value:"Consecutive Characters",id:"consecutive-characters",level:3}];function m(n){const e={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"common-coding-problems",children:"Common Coding Problems"}),"\n",(0,t.jsx)(e.h3,{id:"contains-duplicate",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/contains-duplicate/",children:"Contains Duplicate"})}),"\n",(0,t.jsx)(e.h4,{id:"naive-solution",children:"Naive solution:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public boolean containsDuplicate(int[] nums) {\n    for (int i = 0; i < nums.length - 1; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] == nums[j]) {\n                return true;\n            }\n        }\n    }\n    return false;\n}\n"})}),"\n",(0,t.jsx)(e.h4,{id:"by-sorting",children:"By sorting:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public boolean containsDuplicate(int[] nums) {\n    Arrays.sort(nums);\n\n    for (int i = 0; i < nums.length - 1; i++) {\n        if (nums[i] == nums[i+1]) {\n            return true;\n        }\n    }\n    return false;\n}\n"})}),"\n",(0,t.jsx)(e.h4,{id:"using-set",children:"Using Set:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public boolean containsDuplicate(int[] nums) {\n    Set<Integer> numsSet = new HashSet<>();\n\n    for (int i = 0; i < nums.length; i++) {\n        if(numsSet.contains(nums[i])) {\n            return true;\n        } else {\n            numsSet.add(nums[i]);\n        }\n    }\n    return false;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"maximum-subarray",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/maximum-subarray/",children:"Maximum Subarray"})}),"\n",(0,t.jsx)(e.h4,{id:"brute-force",children:"Brute-force"}),"\n",(0,t.jsx)(e.h4,{id:"kadens-algorithm",children:"Kadens algorithm"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int maxSubArray(int[] nums) {\n    int maxSeen = Integer.MIN_VALUE;\n    int currentMax = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n        currentMax = currentMax + nums[i];\n\n        if (currentMax > maxSeen) {\n            maxSeen = currentMax;\n        }\n\n        if (currentMax < 0) {\n            currentMax = 0;\n        }\n    }\n\n    return maxSeen;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"merge-sorted-array-in-place",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/merge-sorted-array/",children:"Merge Sorted Array (In-place)"})}),"\n",(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.em,{children:"Intuition:"}),"\nAs the result is going to be increasing order, traversing both the arrays from the end and placing the largest on from the end of the list."]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public static void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1;\n    int j = n - 1;\n    int idx = (m + n) - 1;\n\n    while (i >= 0 && j >= 0) {\n        if (nums1[i] > nums2[j]) {\n            nums1[idx--] = nums1[i--];\n        } else {\n            nums1[idx--] = nums2[j--];\n        }\n    }\n\n    while (j >= 0) {\n        nums1[idx--] = nums2[j--];\n    }\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"best-time-to-buy-and-sell-stock",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",children:"Best Time to Buy and Sell Stock"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int maxProfit = 0;\n\n    for (int i = 0; i < prices.length; i++) {\n        if (prices[i] < minPrice) {\n            minPrice = prices[i];\n        } else if (prices[i] - minPrice > maxProfit) {\n            maxProfit = prices[i] - minPrice;\n        }\n    }\n\n    return maxProfit;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"two-sum",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/two-sum/",children:"Two Sum"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int[] twoSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length - 1; i++) {\n        for (int j = i+1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) {\n                return new int[] { i, j };\n            }\n        }\n    }\n\n    return new int[0];\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"palindrome-number",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/palindrome-number/",children:"Palindrome Number"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public boolean isPalindrome(int x) {\n    if (x < 0) { return false; }\n\n    int n = x;\n    int reverse = 0;\n\n    while (n != 0) {\n        int remainder = n % 10;\n        n = n / 10;\n\n        reverse = reverse * 10 + remainder;\n    }\n\n    if (x == reverse) { return true; }\n\n    return false;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"remove-duplicates-from-sorted-array",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/",children:"Remove Duplicates from Sorted Array"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int removeDuplicates(int[] nums) {\n    if (nums.length == 0 || nums.length == 1) {\n        return nums.length;\n    }\n\n    int i = 0;\n    for (int j = 1; j < nums.length; j++) {\n        if (nums[j] != nums[i]) {\n            i++;\n            nums[i] = nums[j];\n        }\n    }\n\n    return i + 1;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"max-consecutive-ones",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/max-consecutive-ones/",children:"Max Consecutive Ones"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int findMaxConsecutiveOnes(int[] nums) {\n    int maxSeen = 0, currentMax = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] == 1) {\n            currentMax += 1;\n            maxSeen = Math.max(currentMax, maxSeen);\n        } else {\n            currentMax = 0;\n        }\n    }\n\n    return maxSeen;\n}\n"})}),"\n",(0,t.jsx)(e.h3,{id:"consecutive-characters",children:(0,t.jsx)(e.a,{href:"https://leetcode.com/problems/consecutive-characters/",children:"Consecutive Characters"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public int maxPower(String s) {\n    int max = 0, currentCount = 0;\n    char prevChar = ' ';\n\n    for (int i = 0; i < s.length(); i++) {\n        char currentChar = s.charAt(i);\n\n        if (prevChar == currentChar) {\n            currentCount++;\n        } else {\n            prevChar = currentChar;\n            currentCount = 1;\n        }\n        max = Math.max(max, currentCount);\n    }\n    return max;\n}\n"})})]})}function u(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(m,{...n})}):m(n)}},8453:(n,e,r)=>{r.d(e,{R:()=>a,x:()=>o});var i=r(6540);const t={},s=i.createContext(t);function a(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:a(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);