/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./backend.js":
/*!********************!*\
  !*** ./backend.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseUrl\": () => (/* binding */ baseUrl),\n/* harmony export */   \"cloudName\": () => (/* binding */ cloudName)\n/* harmony export */ });\nconst baseUrl = \"https://trulylive.herokuapp.com/api\";\nconst cloudName = \"dvp71mrzo\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9iYWNrZW5kLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsT0FBTyxHQUFHLHFDQUFxQztBQUNyRCxNQUFNQyxTQUFTLEdBQUcsV0FBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RydWx5bGl2ZWZyb250ZW5kLy4vYmFja2VuZC5qcz8xYTViIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vdHJ1bHlsaXZlLmhlcm9rdWFwcC5jb20vYXBpJ1xuZXhwb3J0IGNvbnN0IGNsb3VkTmFtZSA9ICdkdnA3MW1yem8nXG4iXSwibmFtZXMiOlsiYmFzZVVybCIsImNsb3VkTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./backend.js\n");

/***/ }),

/***/ "./context/AuthReducer.js":
/*!********************************!*\
  !*** ./context/AuthReducer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialState\": () => (/* binding */ initialState),\n/* harmony export */   \"reducer\": () => (/* binding */ reducer)\n/* harmony export */ });\nconst initialState = {\n    user: null,\n    loading: false\n};\nconst reducer = (state, action)=>{\n    switch(action.type){\n        case \"REGISTER\":\n            return {\n                user: action.payload,\n                loading: false\n            };\n        case \"LOGIN\":\n            return {\n                user: action.payload,\n                loading: false\n            };\n        case \"PROVIDER\":\n            return {\n                user: action.payload,\n                loading: false\n            };\n        case \"LOADING\":\n            return {\n                loading: true\n            };\n        case \"LOADING_DONE\":\n            return {\n                loading: false\n            };\n        default:\n            return state;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0F1dGhSZWR1Y2VyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsWUFBWSxHQUFHO0lBQzFCQyxJQUFJLEVBQUUsSUFBSTtJQUNWQyxPQUFPLEVBQUUsS0FBSztDQUNmO0FBRU0sTUFBTUMsT0FBTyxHQUFHLENBQUNDLEtBQUssRUFBRUMsTUFBTSxHQUFLO0lBQ3hDLE9BQVFBLE1BQU0sQ0FBQ0MsSUFBSTtRQUNqQixLQUFLLFVBQVU7WUFDYixPQUFPO2dCQUNMTCxJQUFJLEVBQUVJLE1BQU0sQ0FBQ0UsT0FBTztnQkFDcEJMLE9BQU8sRUFBRSxLQUFLO2FBQ2Y7UUFDSCxLQUFLLE9BQU87WUFDVixPQUFPO2dCQUNMRCxJQUFJLEVBQUVJLE1BQU0sQ0FBQ0UsT0FBTztnQkFDcEJMLE9BQU8sRUFBRSxLQUFLO2FBQ2Y7UUFDSCxLQUFLLFVBQVU7WUFDYixPQUFPO2dCQUNMRCxJQUFJLEVBQUVJLE1BQU0sQ0FBQ0UsT0FBTztnQkFDcEJMLE9BQU8sRUFBRSxLQUFLO2FBQ2Y7UUFDSCxLQUFLLFNBQVM7WUFDWixPQUFPO2dCQUNMQSxPQUFPLEVBQUUsSUFBSTthQUNkO1FBQ0gsS0FBSyxjQUFjO1lBQ2pCLE9BQU87Z0JBQ0xBLE9BQU8sRUFBRSxLQUFLO2FBQ2Y7UUFDSDtZQUNFLE9BQU9FLEtBQUs7S0FDZjtDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJ1bHlsaXZlZnJvbnRlbmQvLi9jb250ZXh0L0F1dGhSZWR1Y2VyLmpzPzZlM2YiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICB1c2VyOiBudWxsLFxyXG4gIGxvYWRpbmc6IGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlICdSRUdJU1RFUic6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcjogYWN0aW9uLnBheWxvYWQsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgfVxyXG4gICAgY2FzZSAnTE9HSU4nOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHVzZXI6IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIGNhc2UgJ1BST1ZJREVSJzpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1c2VyOiBhY3Rpb24ucGF5bG9hZCxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICBjYXNlICdMT0FESU5HJzpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsb2FkaW5nOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIGNhc2UgJ0xPQURJTkdfRE9ORSc6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJpbml0aWFsU3RhdGUiLCJ1c2VyIiwibG9hZGluZyIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/AuthReducer.js\n");

/***/ }),

/***/ "./context/AuthState.js":
/*!******************************!*\
  !*** ./context/AuthState.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../backend */ \"./backend.js\");\n/* harmony import */ var _AuthReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AuthReducer */ \"./context/AuthReducer.js\");\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! js-cookie */ \"js-cookie\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_5__]);\njs_cookie__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst AuthState = ({ children  })=>{\n    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const { 0: state , 1: dispatch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_AuthReducer__WEBPACK_IMPORTED_MODULE_4__.reducer, _AuthReducer__WEBPACK_IMPORTED_MODULE_4__.initialState);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const localRoute =  false && 0;\n    const token = js_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"token\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        checkUserLogIn();\n    }, []);\n    // Register user\n    const register = async (user)=>{\n        try {\n            setError(null);\n            dispatch({\n                type: \"LOADING\"\n            });\n            const res = await fetch(`${_backend__WEBPACK_IMPORTED_MODULE_3__.baseUrl}/auth/local/register`, {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(user)\n            });\n            const data = await res.json();\n            if (res.ok) {\n                dispatch({\n                    type: \"REGISTER\",\n                    payload: data.user\n                });\n                setError(null);\n                js_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].set(\"token\", data.jwt, {\n                    expires: 5\n                });\n                localRoute ? router.push(`/events/${localRoute}`) : router.push(\"/onboarding\");\n            } else {\n                setError(\"Email address already taken\");\n                dispatch({\n                    type: \"LOADING_DONE\"\n                });\n            }\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    // Login user\n    const login = async (user, usersEmails)=>{\n        try {\n            setError(null);\n            dispatch({\n                type: \"LOADING\"\n            });\n            if (!usersEmails.includes(user.identifier)) {\n                setError(\"Invalid Email address\");\n                dispatch({\n                    type: \"LOADING_DONE\"\n                });\n            } else {\n                const res = await fetch(`${_backend__WEBPACK_IMPORTED_MODULE_3__.baseUrl}/auth/local`, {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                    body: JSON.stringify(user)\n                });\n                const data = await res.json();\n                if (res.ok) {\n                    dispatch({\n                        type: \"LOGIN\",\n                        payload: data.user\n                    });\n                    setError(null);\n                    js_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].set(\"token\", data.jwt, {\n                        expires: 5\n                    });\n                    localRoute ? router.push(`/events/${localRoute}`) : router.push(\"/onboarding\");\n                } else {\n                    setError(\"Invalid Password\");\n                    dispatch({\n                        type: \"LOADING_DONE\"\n                    });\n                }\n            }\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    const checkUserLogIn = async ()=>{\n        try {\n            const res = await fetch(`${_backend__WEBPACK_IMPORTED_MODULE_3__.baseUrl}/users/me`, {\n                method: \"GET\",\n                headers: {\n                    Authorization: `Bearer ${token}`\n                }\n            });\n            const data = await res.json();\n            dispatch({\n                type: \"LOGIN\",\n                payload: data\n            });\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            ...state,\n            dispatch,\n            error,\n            register,\n            login\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\Git\\\\TruelyLiveStreamComment\\\\TrulyLiveStrapi-main\\\\context\\\\AuthState.js\",\n        lineNumber: 105,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthState);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFM0IsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0YsQ0FBQztZQUNGLE1BQU1hLElBQUksR0FBRyxNQUFNUCxHQUFHLENBQUNRLElBQUksRUFBRTtZQUM3Qm5CLFFBQVEsQ0FBQztnQkFBRVUsSUFBSSxFQUFFLE9BQU87Z0JBQUVXLE9BQU8sRUFBRUgsSUFBSTthQUFFLENBQUM7U0FDM0MsQ0FBQyxPQUFPckIsS0FBSyxFQUFFO1lBQ2Q2QixPQUFPLENBQUNDLEdBQUcsQ0FBQzlCLEtBQUssQ0FBQztTQUNuQjtLQUNGO0lBRUQscUJBQ0UsOERBQUNILFdBQVcsQ0FBQ3VDLFFBQVE7UUFDbkJDLEtBQUssRUFBRTtZQUNMLEdBQUduQyxLQUFLO1lBQ1JDLFFBQVE7WUFDUkgsS0FBSztZQUNMVyxRQUFRO1lBQ1JvQixLQUFLO1NBQ047a0JBRUFoQyxRQUFROzs7OztpQkFDWSxDQUN4QjtDQUNGO0FBRUQsaUVBQWVELFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cnVseWxpdmVmcm9udGVuZC8uL2NvbnRleHQvQXV0aFN0YXRlLmpzPzEwMDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcclxuaW1wb3J0IHsgYmFzZVVybCB9IGZyb20gJy4uL2JhY2tlbmQnXHJcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSwgcmVkdWNlciB9IGZyb20gJy4vQXV0aFJlZHVjZXInXHJcbmltcG9ydCBjb29raWUgZnJvbSAnanMtY29va2llJ1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpXHJcblxyXG5jb25zdCBBdXRoU3RhdGUgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKVxyXG5cclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFN0YXRlKVxyXG5cclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG4gIGNvbnN0IGxvY2FsUm91dGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncm91dGUnKVxyXG5cclxuICBjb25zdCB0b2tlbiA9IGNvb2tpZS5nZXQoJ3Rva2VuJylcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNoZWNrVXNlckxvZ0luKClcclxuICB9LCBbXSlcclxuXHJcbiAgLy8gUmVnaXN0ZXIgdXNlclxyXG4gIGNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgKHVzZXIpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNldEVycm9yKG51bGwpXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPQURJTkcnIH0pXHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L2F1dGgvbG9jYWwvcmVnaXN0ZXJgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlcilcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcblxyXG4gICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnUkVHSVNURVInLCBwYXlsb2FkOiBkYXRhLnVzZXIgfSlcclxuICAgICAgICBzZXRFcnJvcihudWxsKVxyXG4gICAgICAgIGNvb2tpZS5zZXQoJ3Rva2VuJywgZGF0YS5qd3QsIHtcclxuICAgICAgICAgIGV4cGlyZXM6IDVcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsUm91dGUgPyByb3V0ZXIucHVzaChgL2V2ZW50cy8ke2xvY2FsUm91dGV9YCkgOiByb3V0ZXIucHVzaCgnL29uYm9hcmRpbmcnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVycm9yKCdFbWFpbCBhZGRyZXNzIGFscmVhZHkgdGFrZW4nKVxyXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPQURJTkdfRE9ORScgfSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMb2dpbiB1c2VyXHJcbiAgY29uc3QgbG9naW4gPSBhc3luYyAodXNlciwgdXNlcnNFbWFpbHMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNldEVycm9yKG51bGwpXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPQURJTkcnIH0pXHJcblxyXG4gICAgICBpZiAoIXVzZXJzRW1haWxzLmluY2x1ZGVzKHVzZXIuaWRlbnRpZmllcikpIHtcclxuICAgICAgICBzZXRFcnJvcignSW52YWxpZCBFbWFpbCBhZGRyZXNzJylcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0FESU5HX0RPTkUnIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7YmFzZVVybH0vYXV0aC9sb2NhbGAsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlcilcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICAgICAgaWYgKHJlcy5vaykge1xyXG4gICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9HSU4nLCBwYXlsb2FkOiBkYXRhLnVzZXIgfSlcclxuICAgICAgICAgIHNldEVycm9yKG51bGwpXHJcbiAgICAgICAgICBjb29raWUuc2V0KCd0b2tlbicsIGRhdGEuand0LCB7XHJcbiAgICAgICAgICAgIGV4cGlyZXM6IDVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBsb2NhbFJvdXRlID8gcm91dGVyLnB1c2goYC9ldmVudHMvJHtsb2NhbFJvdXRlfWApIDogcm91dGVyLnB1c2goJy9vbmJvYXJkaW5nJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0RXJyb3IoJ0ludmFsaWQgUGFzc3dvcmQnKVxyXG4gICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9BRElOR19ET05FJyB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjaGVja1VzZXJMb2dJbiA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L3VzZXJzL21lYCwge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPR0lOJywgcGF5bG9hZDogZGF0YSB9KVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyXHJcbiAgICAgIHZhbHVlPXt7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZGlzcGF0Y2gsXHJcbiAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgcmVnaXN0ZXIsXHJcbiAgICAgICAgbG9naW5cclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhTdGF0ZVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVJlZHVjZXIiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsImJhc2VVcmwiLCJpbml0aWFsU3RhdGUiLCJyZWR1Y2VyIiwiY29va2llIiwiQXV0aENvbnRleHQiLCJBdXRoU3RhdGUiLCJjaGlsZHJlbiIsImVycm9yIiwic2V0RXJyb3IiLCJzdGF0ZSIsImRpc3BhdGNoIiwicm91dGVyIiwibG9jYWxSb3V0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsImdldCIsImNoZWNrVXNlckxvZ0luIiwicmVnaXN0ZXIiLCJ1c2VyIiwidHlwZSIsInJlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsImpzb24iLCJvayIsInBheWxvYWQiLCJzZXQiLCJqd3QiLCJleHBpcmVzIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJsb2dpbiIsInVzZXJzRW1haWxzIiwiaW5jbHVkZXMiLCJpZGVudGlmaWVyIiwiQXV0aG9yaXphdGlvbiIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/AuthState.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var nextjs_progressbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nextjs-progressbar */ \"nextjs-progressbar\");\n/* harmony import */ var nextjs_progressbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextjs_progressbar__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _context_AuthState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/AuthState */ \"./context/AuthState.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_AuthState__WEBPACK_IMPORTED_MODULE_5__]);\n_context_AuthState__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((nextjs_progressbar__WEBPACK_IMPORTED_MODULE_4___default()), {\n                color: \"#ee1f26\",\n                height: 2\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Git\\\\TruelyLiveStreamComment\\\\TrulyLiveStrapi-main\\\\pages\\\\_app.js\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthState__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Git\\\\TruelyLiveStreamComment\\\\TrulyLiveStrapi-main\\\\pages\\\\_app.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Git\\\\TruelyLiveStreamComment\\\\TrulyLiveStrapi-main\\\\pages\\\\_app.js\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Git\\\\TruelyLiveStreamComment\\\\TrulyLiveStrapi-main\\\\pages\\\\_app.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQThCO0FBQ3dCO0FBQ1I7QUFDQTtBQUNGO0FBRTVDLFNBQVNJLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBRSxFQUFFO0lBQ3ZDLHFCQUNFOzswQkFDRSw4REFBQ0osMkRBQWE7Z0JBQUNLLEtBQUssRUFBQyxTQUFTO2dCQUFDQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7b0JBQUk7MEJBQzVDLDhEQUFDTCwwREFBUzs7a0NBQ1IsOERBQUNFLFNBQVM7d0JBQUUsR0FBR0MsU0FBUzs7Ozs7NEJBQUk7a0NBQzVCLDhEQUFDTiwwREFBYzs7Ozs0QkFBRzs7Ozs7O29CQUNSOztvQkFDWCxDQUNKO0NBQ0Y7QUFFRCxpRUFBZUksS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3RydWx5bGl2ZWZyb250ZW5kLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xyXG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciwgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSdcclxuaW1wb3J0ICdyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzJ1xyXG5pbXBvcnQgTmV4dE5wcm9ncmVzcyBmcm9tICduZXh0anMtcHJvZ3Jlc3NiYXInXHJcbmltcG9ydCBBdXRoU3RhdGUgZnJvbSAnLi4vY29udGV4dC9BdXRoU3RhdGUnXHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPE5leHROcHJvZ3Jlc3MgY29sb3I9XCIjZWUxZjI2XCIgaGVpZ2h0PXsyfSAvPlxyXG4gICAgICA8QXV0aFN0YXRlPlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICA8VG9hc3RDb250YWluZXIgLz5cclxuICAgICAgPC9BdXRoU3RhdGU+XHJcbiAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwXHJcbiJdLCJuYW1lcyI6WyJUb2FzdENvbnRhaW5lciIsInRvYXN0IiwiTmV4dE5wcm9ncmVzcyIsIkF1dGhTdGF0ZSIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY29sb3IiLCJoZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "nextjs-progressbar":
/*!*************************************!*\
  !*** external "nextjs-progressbar" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("nextjs-progressbar");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = import("js-cookie");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();