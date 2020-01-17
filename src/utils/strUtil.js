/**
 * 字符串截取 包含对中文处理
 * @param  {string} str 被截取字符串
 * @param  {number} n 截取长度
 */

export function subString(str, n) {
  let len = 0
  let tmpStr = ''
  for (let i = 0; i < str.length; i++) {
    // 遍历字符串
    if (/[\u4e00-\u9fa5]/.test(str[i])) {
      // 判断为中文  长度为三字节（可根据实际需求更换长度，将所加长度更改即可）
      len += 2
    } else {
      // 其余则长度为一字节
      len += 1
    }
    if (len > n) {
      // 当长度大于传入的截取长度时，退出循环
      break
    } else {
      tmpStr += str[i] // 将每个长度范围内的字节加入到新的字符串中
    }
  }
  return tmpStr // 返回截取好的字符串
}

/**
 * 字节长度
 * @param  {string} val
 */
export function getByteLen(val) {
  var len = 0
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/gi) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}

/**
 * 验证特殊表情
 * @param  {string} substring
 */
export function isEmojiCharacter(substring) {
  for (var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i)
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1)
        var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1)
      if (ls == 0x20e3) {
        return true
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true
      } else if (0x2b05 <= hs && hs <= 0x2b07) {
        return true
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true
      } else if (
        hs == 0xa9 ||
        hs == 0xae ||
        hs == 0x303d ||
        hs == 0x3030 ||
        hs == 0x2b55 ||
        hs == 0x2b1c ||
        hs == 0x2b1b ||
        hs == 0x2b50
      ) {
        return true
      }
    }
  }
}

/**
 * 验证 是否有特殊字符，有返回 true, 没有返回 false
 * @param  {string} substring
 */
export function checkString(substring) {
  var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(substring) || regCn.test(substring)) {
    console.warn('名称不能包含特殊字符.')
    return true
  } else {
    return false
  }
}
/**
 * 判断是否是 undefined , 是返回 true, 否则返回 false
 * @param  {object} obj
 */
export function isUndefined(obj) {
  if (typeof obj == 'undefined') {
    return true
  } else {
    return false
  }
}
