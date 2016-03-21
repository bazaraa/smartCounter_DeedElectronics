/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._props = {}, scheduler.createUnitsView = function(e, t, r, s, a, n, i) {
        "object" == typeof e && (r = e.list, t = e.property, s = e.size || 0, a = e.step || 1, n = e.skip_incorrect, i = e.days || 1, e = e.name), scheduler._props[e] = {
            map_to: t,
            options: r,
            step: a,
            position: 0,
            days: i
        }, s > scheduler._props[e].options.length && (scheduler._props[e]._original_size = s, s = 0), scheduler._props[e].size = s, scheduler._props[e].skip_incorrect = n || !1, scheduler.date[e + "_start"] = scheduler.date.day_start, scheduler.templates[e + "_date"] = function(t, r) {
            var s = scheduler._props[e];
            return s.days > 1 ? scheduler.templates.week_date(t, r) : scheduler.templates.day_date(t)
        }, scheduler._get_unit_index = function(e, t) {
            var r = e.position || 0,
                s = Math.floor((scheduler._correct_shift(+t, 1) - +scheduler._min_date) / 864e5),
                a = e.options.length;
            return s >= a && (s %= a), r + s
        }, scheduler.templates[e + "_scale_text"] = function(e, t, r) {
            return r.css ? "<span class='" + r.css + "'>" + t + "</span>" : t
        }, scheduler.templates[e + "_scale_date"] = function(t) {
            var r = scheduler._props[e],
                s = r.options;
            if (!s.length) return "";
            var a = scheduler._get_unit_index(r, t),
                n = s[a];
            return scheduler.templates[e + "_scale_text"](n.key, n.label, n)
        }, scheduler.templates[e + "_second_scale_date"] = function(e) {
            return scheduler.templates.week_scale_date(e)
        }, scheduler.date["add_" + e] = function(t, r) {
            return scheduler.date.add(t, r * scheduler._props[e].days, "day")
        }, scheduler.date["get_" + e + "_end"] = function(t) {
            return scheduler.date.add(t, (scheduler._props[e].size || scheduler._props[e].options.length) * scheduler._props[e].days, "day")
        }, scheduler.attachEvent("onOptionsLoad", function() {
            for (var t = scheduler._props[e], r = t.order = {}, s = t.options, a = 0; a < s.length; a++) r[s[a].key] = a;
            t._original_size && 0 === t.size && (t.size = t._original_size, delete t.original_size), t.size > s.length ? (t._original_size = t.size, t.size = 0) : t.size = t._original_size || t.size, scheduler._date && scheduler._mode == e && scheduler.setCurrentView(scheduler._date, scheduler._mode)
        }), scheduler["mouse_" + e] = function(e) {
            var t = scheduler._props[this._mode];
            if (t) {
                if (e = this._week_indexes_from_pos(e), this._drag_event || (this._drag_event = {}), this._drag_id && this._drag_mode && (this._drag_event._dhx_changed = !0), this._drag_mode && "new-size" == this._drag_mode) {
                    var r = scheduler._get_event_sday(scheduler._events[scheduler._drag_id]);
                    Math.floor(e.x / t.options.length) != Math.floor(r / t.options.length) && (e.x = r)
                }
                var s = e.x % t.options.length,
                    a = Math.min(s + t.position, t.options.length - 1);
                e.section = (t.options[a] || {}).key, e.x = Math.floor(e.x / t.options.length);
                var n = this.getEvent(this._drag_id);
                this._update_unit_section({
                    view: t,
                    event: n,
                    pos: e
                })
            }
            return e.force_redraw = !0, e
        }, scheduler.callEvent("onOptionsLoad", [])
    }, scheduler._update_unit_section = function(e) {
        var t = e.view,
            r = e.event,
            s = e.pos;
        r && (r[t.map_to] = s.section)
    }, scheduler.scrollUnit = function(e) {
        var t = scheduler._props[this._mode];
        t && (t.position = Math.min(Math.max(0, t.position + e), t.options.length - t.size), this.setCurrentView())
    },
    function() {
        var e = function(e) {
                var t = scheduler._props[scheduler._mode];
                if (t && t.order && t.skip_incorrect) {
                    for (var r = [], s = 0; s < e.length; s++) "undefined" != typeof t.order[e[s][t.map_to]] && r.push(e[s]);
                    e.splice(0, e.length), e.push.apply(e, r)
                }
                return e
            },
            t = scheduler._pre_render_events_table;
        scheduler._pre_render_events_table = function(r, s) {
            return r = e(r), t.apply(this, [r, s])
        };
        var r = scheduler._pre_render_events_line;
        scheduler._pre_render_events_line = function(t, s) {
            return t = e(t), r.apply(this, [t, s])
        };
        var s = function(e, t) {
                if (e && "undefined" == typeof e.order[t[e.map_to]]) {
                    var r = scheduler,
                        s = 864e5,
                        a = Math.floor((t.end_date - r._min_date) / s);
                    return e.options.length && (t[e.map_to] = e.options[Math.min(a + e.position, e.options.length - 1)].key), !0
                }
            },
            a = scheduler._reset_scale,
            n = scheduler.is_visible_events;
        scheduler.is_visible_events = function(e) {
            var t = n.apply(this, arguments);
            if (t) {
                var r = scheduler._props[this._mode];
                if (r && r.size) {
                    var s = r.order[e[r.map_to]];
                    if (s < r.position || s >= r.size + r.position) return !1
                }
            }
            return t
        }, scheduler._reset_scale = function() {
            var e = scheduler._props[this._mode],
                t = a.apply(this, arguments);
            if (e) {
                this._max_date = this.date.add(this._min_date, e.days, "day");
                for (var r = this._els.dhx_cal_data[0].childNodes, s = 0; s < r.length; s++) r[s].className = r[s].className.replace("_now", "");
                var n = new Date;
                if (n.valueOf() >= this._min_date && n.valueOf() < this._max_date) {
                    var i = 864e5,
                        d = Math.floor((n - scheduler._min_date) / i),
                        l = e.options.length,
                        _ = d * l,
                        o = _ + l;
                    for (s = _; o > s; s++) r[s].className = r[s].className.replace("dhx_scale_holder", "dhx_scale_holder_now")
                }
                if (e.size && e.size < e.options.length) {
                    var c = this._els.dhx_cal_header[0],
                        h = document.createElement("DIV");
                    e.position && (h.className = "dhx_cal_prev_button", h.style.cssText = "left:1px;top:2px;position:absolute;", h.innerHTML = "&nbsp;", c.firstChild.appendChild(h), h.onclick = function() {
                        scheduler.scrollUnit(-1 * e.step)
                    }), e.position + e.size < e.options.length && (h = document.createElement("DIV"), h.className = "dhx_cal_next_button", h.style.cssText = "left:auto; right:0px;top:2px;position:absolute;", h.innerHTML = "&nbsp;", c.lastChild.appendChild(h), h.onclick = function() {
                        scheduler.scrollUnit(e.step)
                    })
                }
            }
            return t
        };
        var i = scheduler._reset_scale;
        scheduler._reset_scale = function() {
            var e = scheduler._props[this._mode],
                t = scheduler.xy.scale_height;
            e && e.days > 1 ? this._header_resized || (this._header_resized = scheduler.xy.scale_height, scheduler.xy.scale_height = 2 * t) : this._header_resized && (scheduler.xy.scale_height /= 2, this._header_resized = !1), i.apply(this, arguments)
        };
        var d = scheduler._render_x_header;
        scheduler._render_x_header = function(e, t, r, s) {
            var a = scheduler._props[this._mode];
            if (!a || a.days <= 1) return d.apply(this, arguments);
            if (a.days > 1) {
                var n = scheduler.xy.scale_height;
                scheduler.xy.scale_height = Math.ceil(n / 2), d.call(this, e, t, r, s, Math.ceil(scheduler.xy.scale_height));
                var i = a.options.length;
                if ((e + 1) % i === 0) {
                    var l = document.createElement("DIV");
                    l.className = "dhx_scale_bar dhx_second_scale_bar", this.templates[this._mode + "_second_scalex_class"] && (l.className += " " + this.templates[this._mode + "_scalex_class"](r));
                    var _, o = this._cols[e] * i - 1;
                    _ = i > 1 ? this._colsS[e - (i - 1)] - this.xy.scale_width - 2 : t;
                    var c = this.date.add(this._min_date, Math.floor(e / i), "day");
                    this.set_xy(l, o, this.xy.scale_height - 2, _, 0), l.innerHTML = this.templates[this._mode + "_second_scale_date"](c, this._mode), s.appendChild(l)
                }
                scheduler.xy.scale_height = n
            }
        };
        var l = scheduler._get_event_sday;
        scheduler._get_event_sday = function(e) {
            var t = scheduler._props[this._mode];
            if (t) {
                if (t.days <= 1) return s(t, e), this._get_section_sday(e[t.map_to]);
                var r = 864e5,
                    a = Math.floor((e.end_date.valueOf() - 1 - scheduler._min_date.valueOf()) / r),
                    n = t.options.length,
                    i = t.order[e[t.map_to]];
                return a * n + i - t.position
            }
            return l.call(this, e)
        }, scheduler._get_section_sday = function(e) {
            var t = scheduler._props[this._mode];
            return t.order[e] - t.position
        };
        var _ = scheduler.locate_holder_day;
        scheduler.locate_holder_day = function(e, t, r) {
            var a = scheduler._props[this._mode];
            if (a && r) {
                if (s(a, r), a.days <= 1) return 1 * a.order[r[a.map_to]] + (t ? 1 : 0) - a.position;
                var n = 864e5,
                    i = Math.floor((r.start_date.valueOf() - 1 - scheduler._min_date.valueOf()) / n),
                    d = a.options.length,
                    l = a.order[r[a.map_to]];
                return i * d + 1 * l + (t ? 1 : 0) - a.position
            }
            return _.apply(this, arguments)
        };
        var o = scheduler._time_order;
        scheduler._time_order = function(e) {
            var t = scheduler._props[this._mode];
            t ? e.sort(function(e, r) {
                return t.order[e[t.map_to]] > t.order[r[t.map_to]] ? 1 : -1
            }) : o.apply(this, arguments)
        };
        var c = scheduler._pre_render_events_table;
        scheduler._pre_render_events_table = function(e, t) {
            function r(e) {
                var t = scheduler.date.add(e, 1, "day");
                return t = scheduler.date.date_part(t)
            }
            var s = scheduler._props[this._mode];
            if (s && s.days > 1 && !this.config.all_timed) {
                for (var a = {}, n = 0; n < e.length; n++) {
                    var i = e[n];
                    if (this.isOneDayEvent(e[n])) {
                        var d = +scheduler.date.date_part(new Date(i.start_date));
                        a[d] || (a[d] = []), a[d].push(i)
                    } else {
                        var l = new Date(Math.min(+i.end_date, +this._max_date)),
                            _ = new Date(Math.max(+i.start_date, +this._min_date));
                        for (e.splice(n, 1); + l > +_;) {
                            var o = scheduler._lame_clone(i);
                            o.start_date = _, o.end_date = r(o.start_date), _ = scheduler.date.add(_, 1, "day");
                            var d = +scheduler.date.date_part(new Date(_));
                            a[d] || (a[d] = []), a[d].push(o), e.splice(n, 0, o), n++
                        }
                        n--
                    }
                }
                var h = [];
                for (var n in a) h.splice.apply(h, [h.length - 1, 0].concat(c.apply(this, [a[n], t])));
                for (var n = 0; n < h.length; n++) h[n]._first_chunk = h[n]._last_chunk = !1;
                h.sort(function(e, t) {
                    return e.start_date.valueOf() == t.start_date.valueOf() ? e.id > t.id ? 1 : -1 : e.start_date > t.start_date ? 1 : -1
                }), e = h
            } else e = c.apply(this, [e, t]);
            return e
        }, scheduler.attachEvent("onEventAdded", function(e, t) {
            if (this._loading) return !0;
            for (var r in scheduler._props) {
                var s = scheduler._props[r];
                "undefined" == typeof t[s.map_to] && (t[s.map_to] = s.options[0].key)
            }
            return !0
        }), scheduler.attachEvent("onEventCreated", function(e, t) {
            var r = scheduler._props[this._mode];
            if (r && t) {
                var a = this.getEvent(e),
                    n = this._mouse_coords(t);
                this._update_unit_section({
                    view: r,
                    event: a,
                    pos: n
                }), s(r, a), this.event_updated(a)
            }
            return !0
        })
    }();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_units.js.map