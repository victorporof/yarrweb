// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/* global IS_BUILD, IS_PACKAGED */

const IS_BUILD_FLAG = typeof IS_BUILD !== 'undefined' && IS_BUILD;
const IS_PACKAGED_FLAG = typeof IS_PACKAGED !== 'undefined' && IS_PACKAGED; // TODO

export const IS_LOCAL_BUILD = IS_BUILD_FLAG && !IS_PACKAGED_FLAG;
export const IS_PACKAGED_BUILD = IS_BUILD_FLAG && IS_PACKAGED_FLAG;
export const NOT_RUNNING_IN_BUILD = !IS_LOCAL_BUILD && !IS_PACKAGED_FLAG;
