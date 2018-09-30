<template>
 <div class="global-goto-top" @click="handleClick">
    <span :class="isShow? 'show': 'hide'"></span>
</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isAutoScroll: false
    };
  },
  methods: {
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return parseFloat(scrollTop);
    },
    setScrollTop(height) {
      if (document.documentElement && document.documentElement.scrollTop) {
        document.documentElement.scrollTop = height;
      } else if (document.body) {
        document.body.scrollTop = height;
      }
    },
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return parseFloat(clientHeight);
    },
    handleClick() {
      this.isShow = false;
      this.isAutoScroll = true;
      clearInterval(timer);
      let timer = setInterval(() => {
        let now = this.getScrollTop(); //滚动条竖直距离
        let speed = Math.floor((0 - now) / 5);
        if (now == 0) {
          clearInterval(timer);
          this.isAutoScroll = false;
        }
        this.setScrollTop(now + speed); //标准模式下的浏览器
      }, 30);
    },
    handleScroll() {
      if (
        !this.isShow &&
        !this.isAutoScroll &&
        1 * this.getClientHeight() < this.getScrollTop()
      ) {
        this.isShow = true;
      }
      if (this.isShow && 1 * this.getClientHeight() > this.getScrollTop()) {
        this.isShow = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destoryed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.global-goto-top {
  position: fixed;
  right: 10px;
  bottom: 42px;
  z-index: 999;
  span {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAAllBMVEUAAADr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+v29vaZmZnz8/Pr6+vw8PDt7e3p6em0tLSkpKSdnZ3Jycmjo6Ompqbc3NzBwcGtra1dbEnwAAAAInRSTlMAC094R531uIIVAnbp3NfRmIh7cmwzp767lJBfXKjthkkqC81vPQAAAlpJREFUWMPF2WlzgjAQBuBwKoqI9ehlr3Q3tMVq+///XJlMMxmHEjawTt8Z/eQ8gsRNshF9yeLN7U2Rp5g+LpY3t5s4E2MShHdLrJQCkDoASlW4vAuDYd4s3jUcyFagYXfxzP8C51hZrs1WOA/8wCkq2ROFUw80sqAbjYhgONEgCZ2EFHGFIMkBXPWC20RJr6hk6xb3CNIzgHuXuDain7nuFq+M6GtedYqVHJiqw1wbcYj5573fIwwnAe/b4laLI8z2WEpAjgokrf+MkiOjVudiiHJ0MDwjJzCehMlZNVOSISqyYoCSJWhr8lTxkGrauki+y5wrLlLNf2dXlGzBmSbjznJxqF//Tn3oKh+xJnfQRVqxZXaNzQfzcFiu0j6gsJKMqcKGLIGThLIhF7zkQogMiZ890b4aMzuE3MHj6xFJP+YzsQi9fTTP+QNp5SgBokg0IRHXQBOpJlyLAkiiMd96yULkNPFdvyhmLlKaCM0bkMxUYJ/4qUXZvEuSiSKliZokmSgeaaImSWYqFhTRkBQzF0sgiIY05me3CYVzqB+tqElrHl1DPXGQtRYtac26m0ycZeP0/QWyRUr4+j45ygahuFmSWNwy5CUxMxPFeNJOFKLkJUsz6XKQdtINkIu0a7cH0p3X52PRuYAhDqNDfaDcd3yBxSD7kjW6zMKaf/nPv0nh30rxb/j4t6X8m2f+LT5/I4K/XcLf1Ll068kmGtggc7VGNwhDxI272ah8RYV74cxLWXmK5Yvoy5Nf4/aJv73M3gTnb9WzHyj8/7HHiMMZ+hESpnlBOkL6AWL3v9N0jqX+AAAAAElFTkSuQmCC)
      no-repeat;
    width: 40px;
    height: 40px;
    background-size: 40px auto;
  }

  span.show {
    display: block;
  }

  span.hide {
    display: none;
  }
}
</style>
