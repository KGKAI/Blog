/*
 * @lc app=leetcode.cn id=207 lang=javascript
 *
 * [207] 课程表
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const map = new Map(prerequisites);

    for (const prerequisite of prerequisites) {
        let [c, p] = prerequisite;
        let count = 0;
        while (map.has(c)) {    // 待完成的课程有先修课程
            count++;
            if (count > numCourses) return false;
            c = p;
        }
    }

    return true;
};
// @lc code=end

