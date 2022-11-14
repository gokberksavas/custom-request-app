<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const initialTab = ref('portfolio');
    const sideBarExpanded = ref(false);

    interface tabConfig {
      name: string;
      icon: string;
      label: string;
      to: string;
    }

    const tabConfig: tabConfig[] = [
      {
        name: 'about',
        icon: 'home',
        label: 'Ana Sayfa',
        to: '/',
      },
      {
        name: 'portfolio',
        icon: 'dashboard',
        label: 'Portfolyomuz',
        to: 'portfolio',
      },
      {
        name: 'request-form',
        icon: 'mail_outline',
        label: 'İstek Formu',
        to: 'request-form',
      },
    ];

    return {
      tabConfig,
      initialTab,
      sideBarExpanded,
    };
  },
});
</script>

<template>
  <div class="flex row layout-wrapper">
    <div
      class="flex column justify-center sidebar"
      :class="sideBarExpanded && 'expanded'"
    >
      <div class="flex no-wrap row items-center sidebar-header q-pa-sm">
        <q-avatar class="avatar">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div
          v-if="sideBarExpanded"
          class="text-center col-grow text-h5 sidebar-title"
        >
          Figür Shop
        </div>
      </div>
      <q-tabs
        v-model="initialTab"
        vertical
        class="text-primary col-grow"
        active-bg-color="primary"
        active-color="white"
        indicator-color="transparent"
      >
        <q-route-tab
          v-for="(config, index) in tabConfig"
          :key="index"
          :name="config.name"
          :icon="config.icon"
          :label="config.label"
          :to="config.to"
          class="q-my-sm sidebar-tab no-wrap"
          content-class="tab-content-row"
        />
      </q-tabs>
      <q-btn
        class="expand-sidebar-btn"
        icon="navigate_next"
        round
        size="10px"
        @click="sideBarExpanded = !sideBarExpanded"
      />
    </div>
    <div class="flex row justify-center page-content col-grow no-wrap">
      <div class="content-wrapper col-grow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$sideBarWidth: 74px;
$sideBarExpandedWith: 250px;

.layout-wrapper {
  overflow: hidden;
  height: 100vh;
  background-color: $white;
}

.sidebar {
  height: 100%;
  width: $sideBarWidth;
  box-shadow: 1px 0 10px $shadow-color;
  background-color: $white;
  transition: width 0.3s;
  position: relative;
  z-index: 9999999999999;
  padding: 0 0.1rem;

  .sidebar-header {
    width: calc(100% - 0.6rem);
    margin: 5px 5px 0.6rem 5px;
    overflow: hidden;

    .sidebar-title {
      white-space: nowrap;
    }

    .avatar {
      outline: 3px solid $primary;
    }
  }

  &.expanded {
    width: $sideBarExpandedWith;

    .tab-content-row {
      justify-content: flex-start !important;

      .q-tab__label {
        display: inline-block;
      }
    }

    .expand-sidebar-btn .q-btn__content {
      transform: rotate(180deg);
    }
  }

  .expand-sidebar-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    background-color: $primary;
    color: $white;
  }

  .sidebar-tab {
    height: 2.5rem;
    min-height: unset;
    border-radius: 5px;
    margin: 0 0.3rem;
  }

  .tab-content-row {
    justify-content: center !important;
    flex-direction: row !important;
    flex-wrap: nowrap;
    width: 150px;

    .q-tab__label {
      margin-left: 0.5rem;
      display: none;
    }
  }
}

.page-content {
  overflow-y: scroll;
  padding: 2rem;

  .content-wrapper {
    position: relative;
    border-radius: 5px;
  }
}

@media only screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
  }
  .page-content {
    padding-left: calc(#{$sideBarWidth} + 1rem);
  }
}
</style>