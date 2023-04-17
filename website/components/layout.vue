<template>
  <div class="layout">
    <h2>布局</h2>
    <tp-row tag="div" class="row-border">
      <tp-col tag="span" :offset="2" :span="4">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :offset="2" :span="4">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :offset="2" :span="4">
        <div>33</div>
      </tp-col>
    </tp-row>
    <tp-row tag="div" class="row-border" justify="center">
      <tp-col tag="span" :span="2">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :span="6">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :span="6">
        <div>33</div>
      </tp-col>
    </tp-row>
    <tp-row tag="div" class="row-border" justify="end">
      <tp-col tag="span" :span="2">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>33</div>
      </tp-col>
    </tp-row>
    <tp-row tag="div" class="row-border" justify="space-around">
      <tp-col tag="span" :span="2">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>33</div>
      </tp-col>
    </tp-row>
    <tp-row tag="div" class="row-border" justify="space-between">
      <tp-col tag="span" :span="2">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>33</div>
      </tp-col>
    </tp-row>
    <tp-row tag="div" class="row-border" justify="space-evenly">
      <tp-col tag="span" :span="2">
        <div>11</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>22</div>
      </tp-col>
      <tp-col tag="span" :span="2">
        <div>33</div>
      </tp-col>
    </tp-row>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  width: 100%;
  border: 1px solid #ccc;
}
  
</style>
  
