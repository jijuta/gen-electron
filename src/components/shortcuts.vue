<template>
  <q-list no-border link inset-delimiter>
    <q-item-section>
      <q-item-label>Shortcuts</q-item-label>
    </q-item-section>
    <q-item @click.native="onHome">
      <q-item-section avatar>
        <q-icon color="primary" name="home" />
      </q-item-section>
      <q-item-section>Home</q-item-section>
    </q-item>
    <q-item @click.native="onDesktop">
      <q-item-section avatar>
        <q-icon color="primary" name="desktop_windows" />
      </q-item-section>
      <q-item-section>Desktop</q-item-section>
    </q-item>
    <q-item @click.native="onDocuments">
      <q-item-section avatar>
        <q-icon color="primary" name="folder" />
      </q-item-section>
      <q-item-section>Documents</q-item-section>
    </q-item>
    <q-item @click.native="onDownloads">
      <q-item-section avatar>
        <q-icon color="primary" name="vertical_align_bottom" />
      </q-item-section>
      <q-item-section>Downloads</q-item-section>
    </q-item>
    <q-item @click.native="onPictures">
      <q-item-section avatar>
        <q-icon color="primary" name="image" />
      </q-item-section>
      <q-item-section>Pictures</q-item-section>
    </q-item>
    <q-item @click.native="onMusic">
      <q-item-section avatar>
        <q-icon color="primary" name="music_note" />
      </q-item-section>
      <q-item-section>Music</q-item-section>
    </q-item>
    <q-item @click.native="onMovies">
      <q-item-section avatar>
        <q-icon color="primary" name="local_movies" />
      </q-item-section>
      <q-item-section>Movies</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "Shortcuts",

  data() {
    return {};
  },

  methods: {
    onHome: function() {
      this.$emit("selected", "home");
    },
    onDesktop: function() {
      this.$emit("selected", "desktop");
    },
    onDocuments: function() {
      this.$emit("selected", "documents");
    },
    onDownloads: function() {
      this.$emit("selected", "downloads");
    },
    onPictures: function() {
      this.$emit("selected", "pictures");
    },
    onMusic: function() {
      this.$emit("selected", "music");
    },
    onMovies: function() {
      this.$emit("selected", "videos");
    }
  }
};
</script>

<style>
</style>
