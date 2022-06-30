class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        nums1 = self.mergeSort(nums1, nums2)
        print(nums1)
        length = len(nums1)
        return nums1[length >> 1] if (length & 1) else (nums1[length >> 1] + nums1[(length >> 1) - 1]) / 2.0
        
    def mergeSort(self, left, right):
        leftLen = len(left)
        rightLen = len(right)
        leftIndex = 0
        rightIndex = 0
        ret = []
        
        while((leftLen > leftIndex) and (rightLen > rightIndex)):
            if (left[leftIndex] < right[rightIndex]):
                ret.append(left[leftIndex])
                leftIndex += 1
            else:
                ret.append(right[rightIndex])
                rightIndex += 1
        
        if (leftLen > leftIndex):
            ret = ret + left[leftIndex:]
        if (rightLen > rightIndex):
            ret = ret + right[rightIndex:]
            
        return ret
    
x = Solution()
print(x.findMedianSortedArrays([1, 2], [3, 4]))
